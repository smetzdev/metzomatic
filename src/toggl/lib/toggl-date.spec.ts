import { TogglDate } from './toggl-date';

describe('TogglDate', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('1988-12-03'));
  });

  it('should be defined', () => {
    expect(new TogglDate()).toBeDefined();
  });

  it('be able to get the current date in the right format', () => {
    const expectedString = '1988-12-03';

    const today = new TogglDate().getFormattedString();

    expect(today).toEqual(expectedString);
  });

  it('be able to get the first day of the current month in the right format', () => {
    const expectedString = '1988-12-01';

    const firstDayOfCurrentMonth = new TogglDate()
      .setToFirstDayOfMonth()
      .getFormattedString();

    expect(firstDayOfCurrentMonth).toEqual(expectedString);
  });

  it('be able to get the first day of the last month in the right format', () => {
    const expectedString = '1988-11-01';

    const firstDayOfLastMonth = new TogglDate()
      .substractOneMonth()
      .setToFirstDayOfMonth()
      .getFormattedString();

    expect(firstDayOfLastMonth).toEqual(expectedString);
  });

  it('be able to get the first day of the current month in the right format when its december', () => {
    const today = new Date('1988-01-15');
    const expectedString = '1987-12-01';

    const firstDayOfLastMonth = new TogglDate(today)
      .substractOneMonth()
      .setToFirstDayOfMonth()
      .getFormattedString();

    expect(firstDayOfLastMonth).toEqual(expectedString);
  });

  afterEach(() => {
    jest.useRealTimers();
  });
});
