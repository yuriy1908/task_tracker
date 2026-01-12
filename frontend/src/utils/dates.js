import { set } from 'date-fns'

export const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export const copyTime = (from, to) => 
{
  const fromDate = new Date(from)

  return set(to, {
    hours: fromDate.getHours(),
    minutes: fromDate.getMinutes(),
    seconds: fromDate.getSeconds(),
    milliseconds: fromDate.getMilliseconds(),
  });
}