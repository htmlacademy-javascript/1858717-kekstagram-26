import { showUsersPictures } from './visual-of-minis.js';
import { showAndCloseFullPicture } from './show-close-full-picture.js';
import { validateAndSubmitForm } from './validate-and-submit-form.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

//const usersPictures = getPhotoCards();
//showUsersPictures(usersPictures);
//showAndCloseFullPicture(usersPictures);
validateAndSubmitForm();
getData(showUsersPictures, showAlert);
getData(showAndCloseFullPicture, showAlert);
