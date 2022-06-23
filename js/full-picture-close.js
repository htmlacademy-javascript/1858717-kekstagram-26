import { isEscapeKey } from './util.js';

const closeBigPicture = () => {
  const closeButton = document.querySelector('.big-picture__cancel');
  const bigPicture = document.querySelector('.big-picture');

  const onBigPictureEscapeKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closePicture();
    }
  };

  function closePicture () {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPictureEscapeKeydown);
  }

  closeButton.addEventListener('click', closePicture);
  document.addEventListener('keydown', onBigPictureEscapeKeydown);
};

export { closeBigPicture };
