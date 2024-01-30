import { format, subMonths, startOfMonth } from 'date-fns';

/**
 * Builder class TogglDate to generate a date string that is valid in the Toggl API.
 */
export class TogglDate {
  private date: Date;

  /**
   * @param date Optional parameter to set the initial date. If not provided, the "today" will be used.
   */
  constructor(date?: Date) {
    this.date = date ?? new Date();
  }

  /**
   * Subtracts one month from the current date.
   * @returns The TogglDate object with the updated date.
   */
  public substractOneMonth() {
    this.date = subMonths(this.date, 1);
    return this;
  }

  /**
   * Sets the date to the first day of the current month.
   * @returns The TogglDate object with the updated date.
   */
  public setToFirstDayOfMonth() {
    this.date = startOfMonth(this.date);
    return this;
  }

  /**
   * Gets the formatted string representation of the date in the format 'yyyy-MM-dd'.
   * @returns The date string in TogglApi conform format.
   */
  public getFormattedString() {
    return format(this.date, 'yyyy-MM-dd');
  }
}
