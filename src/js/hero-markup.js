import { fetchMovie } from './api-movie-service';

import cardMarkupTpl from '../templates/movie-list.hbs';

const cardMarkup = document.querySelector('.gallery');

function makeMarkup(movie) {
  cardMarkup.insertAdjacentHTML('beforeend', cardMarkupTpl(movie));
}

fetchMovie().then(data => makeMarkup(data));