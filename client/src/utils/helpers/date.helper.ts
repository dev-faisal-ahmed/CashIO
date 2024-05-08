const months = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

export const dateHelper = (dateStr: string) => {
  const date = new Date(dateStr);
  const month = date.getMonth();
  const year = date.getFullYear();
  const day = date.getDate();

  return `${months[month]} ${day}, ${year}`;
};
