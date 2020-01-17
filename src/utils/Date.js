export function getNumberOfDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

export function getNameOfFirstWeekDayInMonth(year, month) {
  return new Date(year, month - 1, 1).getDay();
}

export function getNumberOfWeeksInMonth(firstDayInMonth, daysInMonth) {
  return [...Array(Math.ceil((firstDayInMonth + daysInMonth) / 7)).keys()].map(week => week + 1);
}

export function getWeekDays(firstDayInMonth, daysInMonth, week) {
  const firstDayInWeek = (week - 1) * 7 - firstDayInMonth;
  return [...Array(7).keys()].map(i => {
    const day = firstDayInWeek + i + 1;
    if (day <=0 || day > daysInMonth) return 0;
    return day;
  });
}

export function getYears(year) {
  const startYear = year - year % 16;
  return [...Array(12).keys()].map(i => startYear + i);
}