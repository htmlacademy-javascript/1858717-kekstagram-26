const getRandomNumber = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  return Math.floor(lower + Math.random() * (upper + 1 - lower));
};

const checkStringLength = (string, maxLength) => string.length <= maxLength;

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const getUniqueElement = (elements) =>  elements.splice(getRandomNumber(0, elements.length-1), 1).join();

const createElement = (tagName, className) => {
  const element = document.createElement(tagName);
  if (className) {
    element.classList.add(className);
  }
  return element;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const isDuplicateInArray = (elements) => new Set(elements).size !== elements.length;

export {
  getRandomArrayElement,
  getUniqueElement,
  getRandomNumber,
  checkStringLength,
  createElement,
  isEscapeKey,
  isDuplicateInArray
};
