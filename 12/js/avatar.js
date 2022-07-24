const fileChooser = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');

const isValidFileType = (type) => {
  switch (type) {
    case 'image/jpeg':
    case 'image/gif':
    case 'image/png':
      return true;
    default: return false;
  }
};

const onFileInputChange = (cb) => {
  preview.src = '';
  const image = fileChooser.files[0];

  if (isValidFileType(image.type)) {
    preview.src = URL.createObjectURL(image);
    cb();
  }
};

export { onFileInputChange };
