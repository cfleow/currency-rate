import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  await prisma.exchangeRate.deleteMany();
  await prisma.currency.deleteMany();
  console.log('Deleted records in exchange_rate and currency tables');

  const currencies = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'SGD', name: 'Singapore Dollar' },
    { code: 'MYR', name: 'Malaysian Ringgit' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'BRL', name: 'Brazilian Real' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'CHF', name: 'Swiss Franc' },
    { code: 'CNY', name: 'Chinese Yuan' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'HKD', name: 'Hong Kong Dollar' },
    { code: 'INR', name: 'Indian Rupee' },
    { code: 'KRW', name: 'South Korean Won' },
    { code: 'IDR', name: 'Indonesian Rupiah' },
    { code: 'THB', name: 'Thai Baht' },
    { code: 'NZD', name: 'New Zealand Dollar' },
    { code: 'PHP', name: 'Philippine Peso' },
    { code: 'SEK', name: 'Swedish Krona' },
    { code: 'NOK', name: 'Norwegian Krone' },
    { code: 'DKK', name: 'Danish Krone' },
    { code: 'ZAR', name: 'South African Rand' },
    { code: 'RUB', name: 'Russian Ruble' },
    { code: 'TRY', name: 'Turkish Lira' },
    { code: 'MXN', name: 'Mexican Peso' },
    { code: 'PLN', name: 'Polish Zloty' },
    { code: 'TWD', name: 'New Taiwan Dollar' },
    { code: 'SAR', name: 'Saudi Riyal' },
    { code: 'AED', name: 'UAE Dirham' },
    { code: 'VND', name: 'Vietnamese Dong' },
    { code: 'EGP', name: 'Egyptian Pound' },
    { code: 'CZK', name: 'Czech Koruna' },
  ];

  const createdCurrencies = [];
  for (const currency of currencies) {
    const createdCurrency = await prisma.currency.create({
      data: currency,
    });
    createdCurrencies.push(createdCurrency);
  }
  console.log('Created currencies.');

  const BASED_RATES: { [key: string]: number } = {
    USD: 4.71,
    EUR: 5.11,
    JPY: 0.03,
    SGD: 3.48,
    MYR: 1.0,
    AUD: 3.1,
    BRL: 0.85,
    CAD: 3.45,
    CHF: 5.2,
    CNY: 0.65,
    GBP: 5.9,
    HKD: 0.6,
    INR: 0.08,
    KRW: 0.0035,
    IDR: 0.0003,
    THB: 0.13,
    NZD: 2.9,
    PHP: 0.084,
    SEK: 0.44,
    NOK: 0.43,
    DKK: 0.68,
    ZAR: 0.25,
    RUB: 0.052,
    TRY: 0.15,
    MXN: 0.27,
    PLN: 1.18,
    TWD: 0.15,
    SAR: 1.25,
    AED: 1.28,
    VND: 0.00019,
    EGP: 0.097,
    CZK: 0.21,
  };

  for (let i = 0; i < 30; i++) {
    const previousDay = getPreviousDay(i);

    for (const currency of createdCurrencies) {
      const baseRate = BASED_RATES[currency.code];
      const rate = baseRate * (1 + (Math.random() - 0.5) * 0.1);

      await prisma.exchangeRate.create({
        data: {
          currencyId: currency.id,
          rate: rate,
          date: previousDay,
        },
      });
    }
  }
  console.log(`Seeded rates for the last 30 days.`);

  console.log(`Seeding finished.`);
}

function getPreviousDay(daysBefore: number) {
  const previousDayString = new Date(
    Date.now() - daysBefore * 24 * 60 * 60 * 1000
  )
    .toISOString()
    .slice(0, 10);

  return previousDayString;
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(`Seeding failed:${error}`);
    await prisma.$disconnect();
    process.exit(1);
  });
