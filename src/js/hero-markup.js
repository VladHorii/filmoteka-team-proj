import { fetchMovie } from './api-movie-service';

import cardMarkupTpl from '../templates/movie-list.hbs';

const cardMarkup = document.querySelector('.gallery__list');

function makeMarkup(movie) {
  cardMarkup.insertAdjacentHTML('beforeend', cardMarkupTpl(movie));
}

// function cutDate(data) {
//   return data.release_date ? data.release_date.split('-')[0] : '';
// }

// function createDate(movies) {
//   return movies.map(movie => ({
//     ...movie,
//     year: cutDate(movie),
//   }));
// }

fetchMovie().then(data => {
  makeMarkup(data);
  // console.log(createDate(data));
});
