import { getUniqueElement, debounce } from './util.js';

const filterButtons = document.querySelectorAll('.img-filters__button');
const sortFiltersContainer = document.querySelector('.img-filters');

const RANDOM_PICTURES_COUNT = 10;

const clearPicturesContainer = () => {
  const usersPictures = document.querySelectorAll('.picture');

  usersPictures.forEach((picture) => picture.remove());
};

const sortPicturesByComments = (pictureA, pictureB) => {
  const pictureACommentsCount = pictureA.comments.length;
  const pictureBCommentsCount = pictureB.comments.length;

  return pictureBCommentsCount - pictureACommentsCount;
};

const filterPicturesRandom = (cb, data, showFullPicture) => {
  const randomData = [];
  const dataCopy = data.slice();

  for (let i = 0; i < RANDOM_PICTURES_COUNT; i++) {
    randomData.push(...getUniqueElement(dataCopy));
  }
  clearPicturesContainer();
  cb(randomData);
  showFullPicture(randomData);
};

const filterPicturesByDiscussed = (cb, data, showFullPicture) => {
  const sortedData = data
    .slice()
    .sort(sortPicturesByComments);

  clearPicturesContainer();
  cb(sortedData);
  showFullPicture(sortedData);
};

const filterUserPictures = (cb, data, showFullPicture) => {
  cb(data);
  showFullPicture(data);
  sortFiltersContainer.classList.remove('img-filters--inactive');

  filterButtons.forEach((filterButton) => {
    filterButton.addEventListener('click', () => {
      filterButtons.forEach((button) => {
        button.classList.remove('img-filters__button--active');
      });
      filterButton.classList.add('img-filters__button--active');

      switch (filterButton.id) {
        case 'filter-random':
          debounce(filterPicturesRandom(cb, data, showFullPicture));
          break;
        case 'filter-discussed':
          debounce(filterPicturesByDiscussed(cb, data, showFullPicture));
          break;
        default:
          debounce (() => {
            clearPicturesContainer();
            cb(data);
            showFullPicture(data);
          });
          break;
      }
    });
  });
};

export { filterUserPictures };
