import { isEscapeKey, isSuccessMessageShown } from './util.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const body = document.querySelector('body');

const successMessage = successMessageTemplate.cloneNode(true);
const successButton = successMessage.querySelector('.success__button');

const onSuccessMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    if (isSuccessMessageShown()){
      evt.preventDefault();
      closeSuccessMessage();
    }
  }
};

const outSuccessMesageClick = (evt) => {
  if (evt.target === successMessage) {
    closeSuccessMessage();
  }
};

const showSuccessMessage = () => {
  body.append(successMessage);
  successButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
  document.addEventListener('click', outSuccessMesageClick);
};

function closeSuccessMessage () {
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  document.addEventListener('click', outSuccessMesageClick);
  body.removeChild(successMessage);
}

export { showSuccessMessage };
