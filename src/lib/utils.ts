export default class Utils {
  static parseInt(number: string | null) {
    if (!number) return null;

    return parseInt(number, 10);
  }

  static getDate(dateInISO: string | number) {
    return new Date(dateInISO).toISOString().split('T')[0];
  }
}
