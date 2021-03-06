import { isEscapeKey, isErrorMessageShown } from './util.js';

const uploadPhotoForm = document.querySelector('.img-upload__form');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');

const errorMessage = errorMessageTemplate.cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');

const onErrorMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt) && isErrorMessageShown()) {
    evt.preventDefault();
    closeErrorMessage();
  }
};

const onOutErrorMesageClick = (evt) => {
  if (evt.target === errorMessage) {
    closeErrorMessage();
  }
};

function closeErrorMessage () {
  document.removeEventListener('keydown', onErrorMessageEscKeydown);
  document.addEventListener('click', onOutErrorMesageClick);
  body.removeChild(errorMessage);
  uploadPhotoForm.classList.remove('hidden');
}

const showErrorMessage = () => {
  uploadPhotoForm.classList.add('hidden');
  body.append(errorMessage);

  errorButton.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', onErrorMessageEscKeydown);
  document.addEventListener('click', onOutErrorMesageClick);
};

export { showErrorMessage };
