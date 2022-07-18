const smallerScaleButton = document.querySelector('.scale__control--smaller');
const biggerScaleButton = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const userImage = document.querySelector('.img-upload__preview img');

const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;

let scaleNumber = +scaleControlValue.value.replace(/[^0-9]/g, '');
let scalePersent;

const setScaleValue = () => {
  scaleControlValue.value = `${scaleNumber}%`;
  scalePersent = scaleNumber/100;
  userImage.style.transform = `scale(${scalePersent})`;
};

const reduceImage = () => {
  if (scaleNumber > MIN_SCALE_VALUE) {
    scaleNumber -= SCALE_STEP;
    setScaleValue();
  } else {
    scaleControlValue.value = `${MIN_SCALE_VALUE}%`;
  }
};

const enlargeImage = () => {
  if (scaleNumber < MAX_SCALE_VALUE){
    scaleNumber += SCALE_STEP;
    setScaleValue();
  } else {
    scaleControlValue.value = `${MAX_SCALE_VALUE}%`;
  }
};

const editImageScale = () => {
  smallerScaleButton.addEventListener('click', reduceImage);
  biggerScaleButton.addEventListener('click', enlargeImage);
};

const destroyScaleControl = () => {
  scaleNumber = MAX_SCALE_VALUE;
  scaleControlValue.value = '100%';
  userImage.style.transform = 'scale(1)';
  smallerScaleButton.removeEventListener('click', reduceImage);
  biggerScaleButton.removeEventListener('click', enlargeImage);
};

export { editImageScale, destroyScaleControl };
