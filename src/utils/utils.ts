export const isDateOlderThan24Hours = (date: Date): boolean => {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - date.getTime();
  const hoursDifference = timeDifference / (1000 * 3600);
  return hoursDifference > 24;
};
