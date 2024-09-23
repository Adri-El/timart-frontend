const updater = {};
const apiUrl = "https://api.entamarket.com/";
const monthsName = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
updater.TokenUpdaterHandler = (token) => {
  localStorage.setItem("entamarketToken", token);
};

const convertPrice = (price) => {
  const priceValue = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);

  return priceValue;
};

const months = (index) => {
  return monthsName[index];
};
export { updater, apiUrl, convertPrice, months };
