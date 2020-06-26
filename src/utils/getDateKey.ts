const getDateKey = (date?: Date | string) => {
  const d = date ? new Date(date) : new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
};

export default getDateKey;
