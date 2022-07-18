const getData = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        response.json();
      } else {
        onFail('Не удалось загрузить изображения. Обновите страницу.');
      }
    })
    .then((data) => onSuccess(data))
    .catch(() => {
      onFail('Не удалось загрузить изображения. Обновите страницу.');
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch('https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body
    }
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};

export { getData, sendData };
