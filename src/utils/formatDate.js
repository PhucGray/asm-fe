export const formatCsharpDate = (date) => {
  if (!date) return "";

  const _date = new Date(Date.parse(date));

  const formatedDate = `${_date.getUTCDate()}/${
    _date.getMonth() + 1
  }/${_date.getFullYear()}`;

  return formatedDate;
};
