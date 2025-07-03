import { MAX_CARD_DISPLAY } from '@/constants';
import prisma from '@/lib/prismaClient';

export default class CurrencyRateService {
  static async getCurrencyRate(date: string, page: number) {
    try {
      const offset = (page - 1) * MAX_CARD_DISPLAY;
      return await prisma.exchangeRate.findMany({
        where: {
          date,
        },
        include: {
          currency: true,
        },
        skip: offset,
        take: MAX_CARD_DISPLAY,
        orderBy: {
          currency: {
            code: 'asc',
          },
        },
      });
    } catch (error) {
      console.log(
        `CurrencyRateService.getCurrencyRate error: ${String(error)}`
      );
      throw error;
    }
  }

  static async getTotalCurrencyRateOnDate(date: string) {
    try {
      return await prisma.exchangeRate.count({
        where: {
          date,
        },
      });
    } catch (error) {
      console.log(
        `CurrencyRateService.getTotalCurrencyRateOnDate error: ${String(error)}`
      );
      throw error;
    }
  }
}
