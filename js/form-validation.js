import { isEscapeKey, isDuplicateInArray } from './util.js';

const body = document.querySelector('body');
const uploadPhotoForm = document.querySelector('.img-upload__form');
const editForm = uploadPhotoForm.querySelector('.img-upload__overlay');
const imageUploadField = uploadPhotoForm.querySelector('#upload-file');
const hashtagField = uploadPhotoForm.querySelector('.text__hashtags');
const descriptionField = uploadPhotoForm.querySelector('.text__description');
const scaleValueField = uploadPhotoForm.querySelector('.scale__control--value');
const originalEffectField = uploadPhotoForm.querySelector('#effect-none');
const cancelUploadButton = uploadPhotoForm.querySelector('.img-upload__cancel');
//const submitButton = uploadPhotoForm.querySelector('.img-upload__submit');

const onEditFormEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditForm();
  }
};

const onFieldFocusKeydown =  (evt) => {evt.stopPropagation();};

const isValidHashtag = () => {
  if (!hashtagField.value) {
    return true;
  }
  const hashTags = hashtagField.value.split(' ');

  if (hashTags.length > 5) {
    return false;
  }

  const hashtagsInLowerCase = hashTags.map((hashtag) => hashtag.toLowerCase());
  const isDuplicateHashtag = isDuplicateInArray(hashtagsInLowerCase);

  if (isDuplicateHashtag) {
    return false;
  }

  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

  return hashTags.every((hashTag) => re.test(hashTag));
};

const onEditFormSubmit = (evt) => {
  evt.preventDefault();
  const pristine = new Pristine(uploadPhotoForm);
  pristine.addValidator(hashtagField, isValidHashtag, 'Error');
  const isValid = pristine.validate();

  if (isValid) {
    uploadPhotoForm.submit();
    closeEditForm();
  } else {
    pristine.getErrors();
  }
};

const openEditForm = () => {
  if (imageUploadField.value) {
    editForm.classList.remove('hidden');
    body.classList.add('modal-open');

    cancelUploadButton.addEventListener('click', closeEditForm);
    document.addEventListener('keydown', onEditFormEscapeKeydown);
    uploadPhotoForm.addEventListener('submit', onEditFormSubmit);
    hashtagField.addEventListener('keydown', onFieldFocusKeydown);
    descriptionField.addEventListener('keydown', onFieldFocusKeydown);
  }
};

function closeEditForm () {
  editForm.classList.add('hidden');
  body.classList.remove('modal-open');
  imageUploadField.value = '';
  hashtagField.value = '';
  descriptionField.value = '';
  scaleValueField.value = '100%';
  originalEffectField.checked = true;
  cancelUploadButton.removeEventListener('click', closeEditForm);
  document.removeEventListener('keydown', onEditFormEscapeKeydown);
  uploadPhotoForm.removeEventListener('submit', onEditFormSubmit);
  hashtagField.removeEventListener('keydown', onFieldFocusKeydown);
  descriptionField.removeEventListener('keydown', onFieldFocusKeydown);
}

const validateAndSubmitForm = () => {
  imageUploadField.addEventListener('change', openEditForm);
};

export { validateAndSubmitForm };

