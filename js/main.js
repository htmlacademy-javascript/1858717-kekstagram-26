import { showUsersPictures } from './visual-of-minis.js';
import { getPhotoCards } from './data.js';
import { showBigPicture } from './full-picture-showing.js';
import './form-validation.js';


const usersPictures = getPhotoCards();
showUsersPictures(usersPictures);
showBigPicture(usersPictures);

