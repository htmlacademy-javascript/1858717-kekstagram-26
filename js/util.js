const getRandomNumber = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  return Math.floor(lower + Math.random() * (upper + 1 - lower));
};

const checkStringLength = (string, maxLength) => string.length <= maxLength;

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const getUniqueElement = (elements) =>  elements.splice(getRandomNumber(0, elements.length-1), 1);

const createElement = (tagName, className) => {
  const element = document.createElement(tagName);
  if (className) {
    element.classList.add(className);
  }
  return element;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const isDuplicateInArray = (elements) => new Set(elements).size !== elements.length;

const isErrorMessageShown = () => {
  const errorMessage = document.querySelector('.error');
  return errorMessage !== null;
};

const isSuccessMessageShown = () => {
  const successMessage = document.querySelector('.success');
  return successMessage !== null;
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');

  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.color = 'red';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'white';

  alertContainer.textContent = message;
  document.body.append(alertContainer);
};

const debounce = (cb, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, rest), timeoutDelay);
  };
};

export {
  getRandomArrayElement,
  getUniqueElement,
  getRandomNumber,
  checkStringLength,
  createElement,
  isEscapeKey,
  isDuplicateInArray,
  isErrorMessageShown,
  isSuccessMessageShown,
  showAlert,
  debounce
};
