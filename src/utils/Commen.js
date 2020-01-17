export function formatNumber(number) {
  return number >= 10 ? `${number}` : `0${number}`;
}