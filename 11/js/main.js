import { validateAndSubmitForm } from './validate-and-submit-form.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { initPicturesFilter } from './filter-and-sort-pictures.js';

validateAndSubmitForm();
getData(initPicturesFilter, showAlert);
