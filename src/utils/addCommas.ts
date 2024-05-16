export const addCommasToNumberString = (input: number): string => {
  return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
