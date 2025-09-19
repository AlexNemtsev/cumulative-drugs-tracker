export const toDateLocal = (date: Date): string => {
  const pad = (n: number) => n.toString().padStart(2, '0');

  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid Date');
  }

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};
