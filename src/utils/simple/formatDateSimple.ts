const formatDateSimple = (date: Date) => {
  const d = new Date(date);
  const yy = d.getFullYear().toString();
  const mm = d.getMonth().toString();
  const dd = d.getDay().toString();
  return `${yy}-${mm}-${dd}`;
};
export default formatDateSimple;
