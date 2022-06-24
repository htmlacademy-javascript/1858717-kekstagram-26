import { showUsersPictures } from './visual-of-minis.js';
import { getPhotoCards } from './data.js';
import { showBigPicture } from './full-picture-showing.js';
import { validateAndSubmitForm } from './validate-and-submit-form.js';


const usersPictures = getPhotoCards();
showUsersPictures(usersPictures);
showBigPicture(usersPictures);
validateAndSubmitForm();

