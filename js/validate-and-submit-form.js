import { isEscapeKey, isDuplicateInArray } from './util.js';

const formData = {
  body: null,
  uploadPhotoForm: null,
  editForm: null,
  imageUploadField: null,
  hashtagField: null,
  descriptionField: null,
  scaleValueField: null,
  originalEffectField: null,
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
  if (!formData.hashtagField.value) {
    return true;
  }
  const hashTags = formData.hashtagField.value.split(' ');

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

const validateAndSubmitForm = () => {
  formData.body = document.querySelector('body');
  formData.uploadPhotoForm = document.querySelector('.img-upload__form');
  formData.editForm = formData.uploadPhotoForm.querySelector('.img-upload__overlay');
  formData.imageUploadField = formData.uploadPhotoForm.querySelector('#upload-file');
  formData.hashtagField = formData.uploadPhotoForm.querySelector('.text__hashtags');
  formData.descriptionField = formData.uploadPhotoForm.querySelector('.text__description');
  formData.scaleValueField = formData.uploadPhotoForm.querySelector('.scale__control--value');
  formData.originalEffectField = formData.uploadPhotoForm.querySelector('#effect-none');
  formData.cancelUploadButton = formData.uploadPhotoForm.querySelector('.img-upload__cancel');

  const pristine = new Pristine(formData.uploadPhotoForm, defaultConfig);
  pristine.addValidator(formData.hashtagField, isValidHashtag, 'Некорректно введен #ХэшТэг');

  const onEditFormEscapeKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeEditForm();
    }
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      formData.uploadPhotoForm.submit();
      closeEditForm();
    } else {
      pristine.getErrors();
    }
  };

  const openEditForm = function() {
    if (formData.imageUploadField.value && isValidFileType(formData.imageUploadField.files[0].type)) {
      formData.editForm.classList.remove('hidden');
      formData.body.classList.add('modal-open');
      formData.cancelUploadButton.addEventListener('click', closeEditForm);
      document.addEventListener('keydown', onEditFormEscapeKeydown);
      formData.uploadPhotoForm.addEventListener('submit', onEditFormSubmit);
      formData.hashtagField.addEventListener('keydown', onFieldFocusKeydown);
      formData.descriptionField.addEventListener('keydown', onFieldFocusKeydown);
    }
  };

  function closeEditForm () {
    formData.editForm.classList.add('hidden');
    formData.body.classList.remove('modal-open');
    formData.imageUploadField.value = '';
    formData.hashtagField.value = '';
    formData.descriptionField.value = '';
    formData.scaleValueField.value = '100%';
    formData.originalEffectField.checked = true;
    const pristineErrorText = formData.uploadPhotoForm.querySelector('.text-help');
    pristineErrorText.style.display = 'none';
    formData.cancelUploadButton.removeEventListener('click', closeEditForm);
    document.removeEventListener('keydown', onEditFormEscapeKeydown);
    formData.uploadPhotoForm.removeEventListener('submit', onEditFormSubmit);
    formData.hashtagField.removeEventListener('keydown', onFieldFocusKeydown);
    formData.descriptionField.removeEventListener('keydown', onFieldFocusKeydown);
  }

  formData.imageUploadField.addEventListener('change', openEditForm);
};

export { validateAndSubmitForm };

