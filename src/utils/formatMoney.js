export const formatMoneyVND = (strMoney) => {
  if (!strMoney) return "";
  return strMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VNĐ";
};
