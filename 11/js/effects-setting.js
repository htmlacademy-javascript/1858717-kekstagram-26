const effectsRadioButtons = document.querySelectorAll('.effects__radio');
const previewImage = document.querySelector('.img-upload__preview img');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValueField = document.querySelector('.effect-level__value');

const EFFECTS = [
  {
    name: 'none',
    step: 0,
    min: 0,
    max: 0,
    unit: ''
  },
  {
    name: 'chrome',
    step: 0.1,
    min: 0,
    max: 1,
    unit: ''
  },
  {
    name: 'sepia',
    step: 0.1,
    min: 0,
    max: 1,
    unit: ''
  },
  {
    name: 'marvin',
    step: 1,
    min: 0,
    max: 100,
    unit: '%'
  },
  {
    name: 'phobos',
    step: 0.1,
    min: 0,
    max: 3,
    unit: 'px'
  },
  {
    name: 'heat',
    step: 0.1,
    min: 1,
    max: 3,
    unit: ''
  }];

const DEFAULT_EFFECT = EFFECTS[0];
let customEffect = DEFAULT_EFFECT;

const START_SLIDER_OPTIONS = {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
};

const onNoneEffectRadioClick = () => {
  effectLevelSlider.setAttribute('disabled', true);
  effectLevelSlider.classList.add('hidden');
  previewImage.style.filter = '';
};

const createEffectSlider = () => {
  noUiSlider.create(effectLevelSlider, START_SLIDER_OPTIONS);

  effectLevelSlider.noUiSlider.on('update', () => {
    const sliderValue = effectLevelSlider.noUiSlider.get();
    const filterValue = `${sliderValue}${customEffect.unit}`;
    effectLevelValueField.value = sliderValue;
    effectLevelSlider.removeAttribute('disabled');
    effectLevelSlider.classList.remove('hidden');
    switch (customEffect.name){
      case 'chrome': previewImage.style.filter = `grayscale(${filterValue})`;
        break;
      case 'sepia': previewImage.style.filter = `sepia(${filterValue})`;
        break;
      case 'marvin': previewImage.style.filter = `invert(${filterValue})`;
        break;
      case 'phobos': previewImage.style.filter = `blur(${filterValue})`;
        break;
      case 'heat': previewImage.style.filter = `brightness(${filterValue})`;
        break;
      default: onNoneEffectRadioClick();
    }
  });

  effectsRadioButtons.forEach((effect) => {
    effect.addEventListener('change', () => {
      previewImage.className = '';
      if (effect.checked) {
        customEffect = EFFECTS.find((EFFECT) => EFFECT.name === effect.value);
        previewImage.classList.add(`effects__preview--${effect.value}`);

        effectLevelSlider.noUiSlider.updateOptions({
          range: {
            min: customEffect.min,
            max: customEffect.max,
          },
          start: customEffect.max,
          step: customEffect.step,
        });
      }
    });
  });
};

const destroyEffectSlider = () => {
  previewImage.removeAttribute('style');
  previewImage.removeAttribute('class');
  customEffect = DEFAULT_EFFECT;
  effectLevelSlider.noUiSlider.destroy();
};


export { createEffectSlider, destroyEffectSlider };
