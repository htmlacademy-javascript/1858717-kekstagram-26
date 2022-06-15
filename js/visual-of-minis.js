import {getPhotoCards} from './data.js';

const usersPicturesContainer = document.querySelector('.pictures');
usersPicturesContainer.querySelector('.pictures__title').classList.remove('visually-hidden');
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');

const usersPictures = getPhotoCards();
const similarListFragment = document.createDocumentFragment();

usersPictures.forEach(({url, likes, comments}) => {
  const pictureElement = picturesTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  similarListFragment.append(pictureElement);
});
usersPicturesContainer.append(similarListFragment);

