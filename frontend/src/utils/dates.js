export const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export const dateToMonday = (date) => 
{
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}

export const addDays = (date, days) => 
{
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}
