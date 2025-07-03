import { Currency, ExchangeRate } from '@prisma/client';

export type ExchangeRateWithCurrency = ExchangeRate & {
  currency: Currency;
};
