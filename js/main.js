const getRandomNumber = (min, max) => {
  if (min > max) {
    const swap = min;
    min = max;
    max = swap;
  } else if (min === max) {
    return min;
  }
  return Math.floor(min + Math.random() * (max + 1 - min));
};
getRandomNumber(6, 6);

const checkStringLength = (string, maxLength) => string.length <= maxLength;

checkStringLength('Hello everybody', 10);
