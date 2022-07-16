import { isEscapeKey, isDuplicateInArray, isErrorMessageShown } from './util.js';
import { editImageScale, destroyScaleControl } from './scale-editing.js';
import { createEffectSlider, destroyEffectSlider } from './effects-setting.js';
import { showErrorMessage } from './show-and-close-error.js';
import { showSuccessMessage } from './show-and-close-success.js';
import { sendData } from './api.js';

const body = document.querySelector('body');
const uploadPhotoForm = document.querySelector('.img-upload__form');
const imgUploadOverlay  = uploadPhotoForm.querySelector('.img-upload__overlay');
const submitButton = uploadPhotoForm.querySelector('.img-upload__submit');

const formFields = {
  imageUpload: null,
  hashtag: null,
  description: null,
  originalEffect: null,
  cancelUploadButton: null,
};

const defaultConfig = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div'
};

const onFieldFocusKeydown =  (evt) => {evt.stopPropagation();};

const isValidFileType = (type) => {
  switch (type) {
    case 'image/jpeg':
    case 'image/gif':
    case 'image/png':
      return true;
    default: return false;
  }
};

const isValidHashtag = () => {
  if (!formFields.hashtag.value) {
    return true;
  }
  const hashTags = formFields.hashtag.value.split(' ');

  if (hashTags.length > 5) {
    return false;
  }

  const hashtagsInLowerCase = hashTags.map((hashTag) => hashTag.toLowerCase());
  const isDuplicateHashtag = isDuplicateInArray(hashtagsInLowerCase);

  if (isDuplicateHashtag) {
    return false;
  }
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

  return hashTags.every((hashTag) => re.test(hashTag));
};

const pristine = new Pristine(uploadPhotoForm, defaultConfig);

const onEditFormEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    if (!isErrorMessageShown()){
      evt.preventDefault();
      closeEditForm();
    }
  }
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'В процессе...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onEditFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();
    sendData(
      () => {
        closeEditForm();
        showSuccessMessage();
        unblockSubmitButton();
      },
      () => {
        showErrorMessage();
        unblockSubmitButton();
      },
      new FormData(evt.target)
    );
  }
};

const openEditForm = () => {
  if (formFields.imageUpload.value && isValidFileType(formFields.imageUpload.files[0].type)) {
    imgUploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');

    editImageScale();
    createEffectSlider();
    formFields.cancelUploadButton.addEventListener('click', closeEditForm);
    document.addEventListener('keydown', onEditFormEscapeKeydown);
    uploadPhotoForm.addEventListener('submit', onEditFormSubmit);
    formFields.hashtag.addEventListener('keydown', onFieldFocusKeydown);
    formFields.description.addEventListener('keydown', onFieldFocusKeydown);
  }
};

function closeEditForm () {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  formFields.imageUpload.value = '';
  formFields.hashtag.value = '';
  formFields.description.value = '';
  formFields.originalEffect.checked = true;

  pristine.reset();
  destroyScaleControl();
  destroyEffectSlider();
  formFields.cancelUploadButton.removeEventListener('click', closeEditForm);
  document.removeEventListener('keydown', onEditFormEscapeKeydown);
  uploadPhotoForm.removeEventListener('submit', onEditFormSubmit);
  formFields.hashtag.removeEventListener('keydown', onFieldFocusKeydown);
  formFields.description.removeEventListener('keydown', onFieldFocusKeydown);
}

const validateAndSubmitForm = () => {
  formFields.imageUpload = uploadPhotoForm.querySelector('#upload-file');
  formFields.hashtag = uploadPhotoForm.querySelector('.text__hashtags');
  formFields.description = uploadPhotoForm.querySelector('.text__description');

  formFields.originalEffect = uploadPhotoForm.querySelector('#effect-none');
  formFields.cancelUploadButton = uploadPhotoForm.querySelector('.img-upload__cancel');

  pristine.addValidator(formFields.hashtag, isValidHashtag, 'Некорректно введен #ХэшТэг');

  formFields.imageUpload.addEventListener('change', openEditForm);
};

export { validateAndSubmitForm };

