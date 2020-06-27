export const getDateKey = (date?: Date | string) => {
  const d = date ? new Date(date) : new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
};

export const getDateFromKey = (dateKey) => {
  const [y, m, d] = dateKey.split("-");
  return new Date(y, m, d);
};
