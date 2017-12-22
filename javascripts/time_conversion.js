export const timeConversion = (value) => {
  let minutes = Math.round(value / 60);
  let seconds = value % 60;
  return `${minutes} minutes and ${seconds} seconds`;
}
