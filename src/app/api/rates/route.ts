import { NextResponse } from 'next/server';
import Utils from '@/lib/utils';
import CurrencyRateService from '@/lib/currencyRateService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const selectedDate = searchParams.get('date');
  const page = Utils.parseInt(searchParams.get('page')) || 1;

  try {
    const targetDate = Utils.getDate(selectedDate || Date.now());
    const rates = await CurrencyRateService.getCurrencyRate(targetDate, page);

    const totalRates = await CurrencyRateService.getTotalCurrencyRateOnDate(
      targetDate
    );
    return NextResponse.json({ rates, total: totalRates });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'An error occurred while fetching exchange rates.' },
      { status: 500 }
    );
  }
}
