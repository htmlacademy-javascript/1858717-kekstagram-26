import { getUniqueElement, debounce } from './util.js';
import { showUsersPictures } from './visual-of-minis.js';
import { showAndCloseFullPicture } from './show-close-full-picture.js';

const RANDOM_PICTURES_COUNT = 10;
const DEBOUNCE_DELAY = 500;

const filterButtons = document.querySelectorAll('.img-filters__button');
const sortFiltersContainer = document.querySelector('.img-filters');

const clearPicturesContainer = () => {
  const usersPictures = document.querySelectorAll('.picture');

  usersPictures.forEach((picture) => picture.remove());
};

const sortPicturesByComments = (pictureA, pictureB) => {
  const pictureACommentsCount = pictureA.comments.length;
  const pictureBCommentsCount = pictureB.comments.length;

  return pictureBCommentsCount - pictureACommentsCount;
};

const filterPicturesRandom = (data) => {
  const randomData = [];
  const dataCopy = data.slice();

  for (let i = 0; i < RANDOM_PICTURES_COUNT; i++) {
    randomData.push(...getUniqueElement(dataCopy));
  }
  clearPicturesContainer();
  showUsersPictures(randomData);
  showAndCloseFullPicture(randomData);
};

const filterPicturesByDiscussed = (data) => {
  const sortedData = data
    .slice()
    .sort(sortPicturesByComments);

  clearPicturesContainer();
  showUsersPictures(sortedData);
  showAndCloseFullPicture(sortedData);
};

const filterUsersPictures = (button, data) => {
  filterButtons.forEach((filterButton) => {
    filterButton.classList.remove('img-filters__button--active');
  });
  button.classList.add('img-filters__button--active');

  switch (button.id) {
    case 'filter-random':
      filterPicturesRandom(data);
      break;
    case 'filter-discussed':
      filterPicturesByDiscussed(data);
      break;
    default:
      clearPicturesContainer();
      showUsersPictures(data);
      showAndCloseFullPicture(data);
      break;
  }
};

const initPicturesFilter = (data) => {
  showUsersPictures(data);
  showAndCloseFullPicture(data);

  const usersImage = document.querySelector('.picture__img');
  usersImage.addEventListener('load', () => {
    sortFiltersContainer.classList.remove('img-filters--inactive');
  });

  const buttonClickHandler = debounce((evt) => {filterUsersPictures(evt.target, data);}, DEBOUNCE_DELAY);

  filterButtons.forEach((filterButton) => {
    filterButton.addEventListener('click', buttonClickHandler);
  });
};
export { initPicturesFilter };
