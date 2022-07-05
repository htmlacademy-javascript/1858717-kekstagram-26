import { createElement } from './util.js';
import { isEscapeKey } from './util.js';

const SHOWN_COMMENTS_COUNT_STEP = 5;

const bigPictureData = {
  miniPictures: null,
  bigPicture: null,
  bigPictureImage: null,
  likesCount: null,
  commentsCount: null,
  socialComments: null,
  pictureDescription: null,
  body: null,
  shownCommentsCount: null,
  commentsLoaderButton: null,
  closeButton: null,
};

let currentUserPicture;
let commentsToShowCount = SHOWN_COMMENTS_COUNT_STEP;

const showUserComments = () => {
  const similarListFragment = document.createDocumentFragment();
  for (let i = 0; i < commentsToShowCount; i++) {
    const userComment = createElement('li', 'social__comment');
    const userCommentImage = createElement('img', 'social__picture');
    const userCommentText = createElement('p', 'social__text');

    userCommentImage.src = currentUserPicture.comments[i].avatar;
    userCommentImage.alt = currentUserPicture.comments[i].name;
    userCommentImage.style.width = '35';
    userCommentImage.style.heigth = '35';
    userComment.append(userCommentImage);

    userCommentText.textContent = currentUserPicture.comments[i].message;
    userComment.append(userCommentText);
    similarListFragment.append(userComment);
  }
  bigPictureData.socialComments.innerHTML = '';
  bigPictureData.socialComments.append(similarListFragment);
};

const showAllComments = () => {
  commentsToShowCount = currentUserPicture.comments.length;
  bigPictureData.shownComments.textContent = currentUserPicture.comments.length;
  bigPictureData.commentsLoaderButton.classList.add('hidden');
  bigPictureData.commentsLoaderButton.removeEventListener('click', onCommentsLoaderButtonClick);
  showUserComments();
};

function onCommentsLoaderButtonClick () {
  if ((commentsToShowCount + SHOWN_COMMENTS_COUNT_STEP) >= currentUserPicture.comments.length){
    showAllComments();
  } else {
    bigPictureData.commentsLoaderButton.classList.remove('hidden');
    commentsToShowCount = commentsToShowCount + SHOWN_COMMENTS_COUNT_STEP;
    bigPictureData.shownComments.textContent = commentsToShowCount;
    showUserComments();
  }
}

const chooseCommentFoo = () => {
  if (commentsToShowCount >= currentUserPicture.comments.length) {
    showAllComments();
  } else {
    bigPictureData.commentsLoaderButton.classList.remove('hidden');
    bigPictureData.commentsLoaderButton.addEventListener('click', onCommentsLoaderButtonClick);
    showUserComments();
  }
};

const onBigPictureEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePicture();
  }
};

function closePicture () {
  bigPictureData.bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscapeKeydown);
  bigPictureData.commentsLoaderButton.removeEventListener('click', onCommentsLoaderButtonClick);
  bigPictureData.closeButton.removeEventListener('click', closePicture);
  commentsToShowCount = SHOWN_COMMENTS_COUNT_STEP;
}

const closeBigPicture = () => {
  bigPictureData.closeButton = document.querySelector('.big-picture__cancel');
  bigPictureData.closeButton.addEventListener('click', closePicture);
  document.addEventListener('keydown', onBigPictureEscapeKeydown);
};

const showAndCloseFullPicture = (usersPictures) => {
  bigPictureData.miniPictures = document.querySelectorAll('.picture');
  bigPictureData.bigPicture = document.querySelector('.big-picture');
  bigPictureData.bigPictureImage = document.querySelector('.big-picture__img img');
  bigPictureData.likesCount = bigPictureData.bigPicture.querySelector('.likes-count');
  bigPictureData.commentsCount = bigPictureData.bigPicture.querySelector('.comments-count');
  bigPictureData.socialComments = bigPictureData.bigPicture.querySelector('.social__comments');
  bigPictureData.pictureDescription = bigPictureData.bigPicture.querySelector('.social__caption');
  bigPictureData.body = document.querySelector('body');
  bigPictureData.shownComments = bigPictureData.bigPicture.querySelector('.shown-comments-count');
  bigPictureData.commentsLoaderButton = bigPictureData.bigPicture.querySelector('.comments-loader');

  for (let i = 0; i < bigPictureData.miniPictures.length; i++) {
    bigPictureData.miniPictures[i].addEventListener('click', () => {
      currentUserPicture = usersPictures[i];

      bigPictureData.bigPictureImage.src = currentUserPicture.url;
      bigPictureData.bigPictureImage.alt = currentUserPicture.description;
      bigPictureData.likesCount.textContent = currentUserPicture.likes;
      bigPictureData.commentsCount.textContent = currentUserPicture.comments.length;
      bigPictureData.shownComments.textContent = SHOWN_COMMENTS_COUNT_STEP;

      chooseCommentFoo();

      bigPictureData.pictureDescription.textContent = currentUserPicture.description;
      bigPictureData.bigPicture.classList.remove('hidden');

      bigPictureData.body.classList.add('modal-open');
      closeBigPicture();
    });
  }
};

export { showAndCloseFullPicture };
