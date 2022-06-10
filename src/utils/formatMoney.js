export const formatMoneyVND = (strMoney) =>
  strMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VNĐ";
