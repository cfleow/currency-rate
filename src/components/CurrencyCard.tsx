import { ExchangeRateWithCurrency } from '@/types';

export default function CurrencyCard({
  rate,
}: {
  rate: ExchangeRateWithCurrency;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-lg text-gray-800">
            {rate.currency.code}
          </span>
          <span className="text-sm text-gray-500">{rate.currency.name}</span>
        </div>
        <p className="text-2xl font-semibold text-gray-900">
          {rate.rate.toFixed(4)}
        </p>
      </div>
      <div className="text-right text-xs text-gray-400 mt-4">
        {new Date(rate.date).toLocaleDateString()}
      </div>
    </div>
  );
}
