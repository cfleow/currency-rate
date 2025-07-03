'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ExchangeRateWithCurrency } from '@/types';
import CurrencyCard from './CurrencyCard';
import Utils from '@/lib/utils';

async function fetchRates(
  date: string | null,
  page: number
): Promise<{ rates: ExchangeRateWithCurrency[]; total: number }> {
  const urlPath = '/api/rates';
  const params = new URLSearchParams({
    ...(date ? { date } : {}),
    page: page.toString(),
  });

  const url = `${urlPath}?${params.toString()}`;
  const result = await fetch(url);
  if (!result.ok) {
    throw new Error('Failed to fetch rates');
  }
  return result.json();
}

export default function ExchangeRateGrid() {
  const [rates, setRates] = useState<ExchangeRateWithCurrency[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const onObserved = (entries: IntersectionObserverEntry[]) => {
    const shouldLoadMoreData =
      entries[0].isIntersecting && rates.length < total;

    if (!shouldLoadMoreData) {
      return;
    }

    setPage((prevPage) => prevPage + 1);
  };

  const observer = useRef<IntersectionObserver>(undefined);
  const lastRateElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver(onObserved);
      if (node) observer.current.observe(node);
    },
    [loading, rates.length, total]
  );

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchRatesHandler(selectedDate, page);
  }, [page, selectedDate]);

  const fetchRatesHandler = async (date: string | null, page: number) => {
    try {
      const { rates, total } = await fetchRates(date, page);
      setRates((prevRates) => [...prevRates, ...rates]);
      setTotal(total);
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    setRates([]);
    setSelectedDate(event.target.value);
  };

  const resetDatePicker = () => {
    setPage(1);
    setRates([]);
    setSelectedDate(null);
    const datePicker = document.getElementById(
      'date-picker'
    ) as HTMLInputElement;
    if (datePicker) {
      datePicker.value = '';
    }
  };

  return (
    <div className="w-full max-w-7xl">
      <div className="mb-8">
        <label
          htmlFor="date-picker"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select a date to view historical rates:
        </label>
        <input
          type="date"
          id="date-picker"
          max={Utils.getDate(Date.now())}
          onChange={handleDateChange}
          className="w-full sm:w-auto p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        {selectedDate && (
          <button
            onClick={resetDatePicker}
            className="ml-4 p-2 text-sm text-indigo-600 hover:text-indigo-900"
          >
            Clear
          </button>
        )}
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {rates.map((rate, index) => {
          const isLastCurrency = rates.length === index + 1;
          return (
            <div ref={isLastCurrency ? lastRateElementRef : null} key={rate.id}>
              <CurrencyCard rate={rate} />
            </div>
          );
        })}
      </div>
      {loading && <p className="text-center mt-4">Loading...</p>}
      {!loading && rates.length === 0 && (
        <p className="text-center mt-4 text-gray-500">
          No rates found for this date.
        </p>
      )}
    </div>
  );
}
