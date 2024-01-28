import { format, subMonths, startOfMonth } from 'date-fns';

export class TogglDate {
  private date: Date;

  constructor(date?: Date) {
    this.date = date ?? new Date();
  }

  public substractOneMonth() {
    this.date = subMonths(this.date, 1);
    return this;
  }

  public setToFirstDayOfMonth() {
    this.date = startOfMonth(this.date);
    return this;
  }

  public getFormattedString() {
    return format(this.date, 'yyyy-MM-dd');
  }
}
