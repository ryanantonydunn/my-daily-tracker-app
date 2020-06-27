const formatNumber = (n: string, decimalPlaces: number = 2) => {
  // replace all non numeric, dots or dashes that aren't the first char
  const filtered = n.replace(/(?!^)-|[^\d.-]/g, "");

  // make sure there's only one dot
  const [first, ...others] = filtered.split(".");
  const decimals = others.length ? [first, others.join("")] : [filtered];

  // round to two decimal places
  if (decimals.length > 1) {
    decimals[1] = decimals[1].substring(0, 2);
  }

  // join the dots back together
  return decimals.join(".").substring(0, 10);
};

export default formatNumber;
