import {describe, expect, it} from '@jest/globals';
import {DateUtils} from '@utils/date';

describe('Testing DateUtils class', () => {
  it('should return zero date', () => {
    const today = new Date();
    const util = new DateUtils(today);
    expect(util.zeroDate).toEqual(new Date(today.setHours(0, 0, 0, 0)));
  });

  it('should return date', () => {
    const today = new Date();
    const util = new DateUtils(today);
    expect(util.date).toEqual(today);
  });

  it('should add years', () => {
    const today = new Date();
    const util = new DateUtils(today);
    const years = 5;
    util.plusYears(years);
    expect(util.date.getFullYear()).toEqual(today.getFullYear() + years);
  });

  it('should subtract years', () => {
    const today = new Date();
    const util = new DateUtils(today);
    const years = 5;
    util.minusYears(years);
    expect(util.date.getFullYear()).toEqual(today.getFullYear() - years);
  });

  it('should add months', () => {
    const today = new Date();
    const util = new DateUtils(today);
    const months = 5;
    util.plusMonths(months);
    expect(util.date.getMonth()).toEqual(today.getMonth() + months);
  });

  it('should subtract months', () => {
    const today = new Date();
    const util = new DateUtils(today);
    const months = 5;
    util.minusMonths(months);
    expect(util.date.getMonth()).toEqual(today.getMonth() - months);
  });

  it('should add days', () => {
    const today = new Date();
    const util = new DateUtils(today);
    const days = 5;
    util.plusDays(days);
    expect(util.date.getDate()).toEqual(today.getDate() + days);
  });

  it('should subtract days', () => {
    const today = new Date();
    const util = new DateUtils(today);
    const days = 5;
    util.minusDays(days);
    expect(util.date.getDate()).toEqual(today.getDate() - days);
  });
});
