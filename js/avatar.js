const FILE_TYPES = ['image/jpeg', 'image/gif', 'image/png'];

const fileChooser = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');

const isValidFileType = (type) => FILE_TYPES.includes(type);

const onFileInputChange = (cb) => {
  preview.src = '';
  const image = fileChooser.files[0];

  if (isValidFileType(image.type)) {
    preview.src = URL.createObjectURL(image);
    cb();
  }
};

export { onFileInputChange };
