import { getRandomArrayElement, getUniqueElement, getRandomNumber } from './util.js';

const MAX_COMMENT_COUNT = 4;
const PHOTO_CARDS_COUNT = 25;
const photoDescriptions = [
  'Зацените красоту!',
  'Мир моими глазами',
  'Я художник, я так вижу',
  'А ну ка залайкайте этот шедевр!',
  'Perfecto',
  'Настроение осень...(((',
  'Отпуск затянулся ;)',
  'Минутка юмора',
  'Мечта, мечта!',
  'Что у вас тут происходит?'
];

const commentMessages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const commentatorNames = [
  'Владлен',
  'Мишель',
  'Авраам',
  'Джо',
  'Барак',
  'Эмануэль',
  'Борис',
  'Маргарет',
  'Елизавета',
  'Оллоф'
];

const photoIds = [... Array (25) .keys ()].map((i) => ++i);
const photoUrls = photoIds.slice();

const createComment = () => ({
  id: getRandomNumber(1, 20000),
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: getRandomArrayElement(commentMessages),
  name: getRandomArrayElement(commentatorNames),
});

const createPhotoCards = () => ({
  id: getUniqueElement(photoIds),
  url: `photos/${getUniqueElement(photoUrls)}.jpg`,
  description: getRandomArrayElement(photoDescriptions),
  likes: getRandomNumber(15, 200),
  comments: Array.from({length: getRandomNumber(1, MAX_COMMENT_COUNT)}, createComment)
});

const getPhotoCards = () => Array.from({length: PHOTO_CARDS_COUNT}, createPhotoCards);

export { getPhotoCards };
