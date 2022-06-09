const PHOTO_DESCRIPTIONS = [
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

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const COMMENTATOR_NAMES = [
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

const PHOTO_IDS = [... Array (25) .keys ()].map((i) => ++i);
const PHOTO_URLS = PHOTO_IDS.slice();
const MAX_COMMENT_COUNT = 4;
const PHOTO_CARDS_COUNT = 25;

const getRandomNumber = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  return Math.floor(lower + Math.random() * (upper + 1 - lower));
};

const checkStringLength = (string, maxLength) => string.length <= maxLength;

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const getUniqueElement = (elements) =>  elements.splice(getRandomNumber(0, elements.length-1), 1).join();

const createComment = () => ({
  id: getRandomNumber(1, 20000),
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: getRandomArrayElement(COMMENT_MESSAGES),
  name: getRandomArrayElement(COMMENTATOR_NAMES),
});

const createPhotoCards = () => ({
  id: getUniqueElement(PHOTO_IDS),
  url: `photos/${getUniqueElement(PHOTO_URLS)}.jpg`,
  description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
  likes: getRandomNumber(15, 200),
  comments: Array.from({length: getRandomNumber(1, MAX_COMMENT_COUNT)}, createComment)
});

const photoCards = Array.from({length: PHOTO_CARDS_COUNT}, createPhotoCards);

//Чтоб не ругался ESLINT за неиспользование photoCards & checkStringLength
photoCards.join(', ');
checkStringLength('Hello everybody', 10);

