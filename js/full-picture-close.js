const closeBigPicture = () => {
  const closeButton = document.querySelector('.big-picture__cancel');
  const bigPicture = document.querySelector('.big-picture');

  const eventHandler = () => {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  };

  closeButton.addEventListener('click', eventHandler);

  document.addEventListener('keydown', (evt) => {
    if (!bigPicture.classList.contains('hidden')){
      if (evt.key === 'Escape') {
        eventHandler();
      }
    }
  });
};

export { closeBigPicture };
