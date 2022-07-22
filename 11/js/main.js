import { showUsersPictures } from './visual-of-minis.js';
import { showAndCloseFullPicture } from './show-close-full-picture.js';
import { validateAndSubmitForm } from './validate-and-submit-form.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { filterUserPictures } from './filter-and-sort-pictures.js';

const onSuccess = (data) => {
  filterUserPictures(showUsersPictures, data, showAndCloseFullPicture);
};
validateAndSubmitForm();
getData(onSuccess, showAlert);
