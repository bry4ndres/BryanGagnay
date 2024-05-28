import { DateFormatPipe } from './date-format.pipe';

describe('DateFormatPipe', () => {
  let pipe: DateFormatPipe;

  beforeEach(() => {
    pipe = new DateFormatPipe('en-US');
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format date correctly', () => {
    const date = new Date(2022, 0, 1);
    expect(pipe.transform(date)).toBe('2022-01-01');
  });
});
