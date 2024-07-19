export class DateUtils {
  private _date: Date;

  constructor(date?: Date | string | number) {
    this._date = date === undefined ? new Date() : new Date(date);
  }

  get zeroDate(): Date {
    return new Date(new Date(this._date).setHours(0, 0, 0, 0));
  }

  get date(): Date {
    return this._date;
  }

  plusYears(years: number): this {
    this._date.setFullYear(this._date.getFullYear() + years);
    return this;
  }

  minusYears(years: number): this {
    this._date.setFullYear(this._date.getFullYear() - years);
    return this;
  }

  plusMonths(months: number): this {
    this._date.setMonth(this._date.getMonth() + months);
    return this;
  }

  minusMonths(months: number): this {
    this._date.setMonth(this._date.getMonth() - months);
    return this;
  }

  plusDays(days: number): this {
    this._date.setDate(this._date.getDate() + days);
    return this;
  }

  minusDays(days: number): this {
    this._date.setDate(this._date.getDate() - days);
    return this;
  }
}
