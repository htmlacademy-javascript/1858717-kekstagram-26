import { showUsersPictures } from './visual-of-minis.js';
import { getPhotoCards } from './data.js';
import { showAndCloseFullPicture } from './show-close-full-picture.js';
import { validateAndSubmitForm } from './validate-and-submit-form.js';

const usersPictures = getPhotoCards();
showUsersPictures(usersPictures);
showAndCloseFullPicture(usersPictures);
validateAndSubmitForm();
