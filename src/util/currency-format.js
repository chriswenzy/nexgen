export const formatCurrency = (value) => {
  const formatter = new Intl.NumberFormat("en-US", {});
  return `₦ ${formatter.format(+value)}`;
};

export const formatCurrency2 = (value) => {
  const number = +value;
  const formatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 3,
    notation: "compact",
    compactDisplay: "short"
  });

  return `₦ ${formatter.format(number)}`;
};
