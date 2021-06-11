import { MovieService } from './api-movie-service';

import cardMarkupTpl from '../templates/movie-list.hbs';

const cardMarkup = document.querySelector('.gallery__list');
const movieService = new MovieService();

function makeMarkup(movie) {
  cardMarkup.insertAdjacentHTML('beforeend', cardMarkupTpl(movie));
}

async function markupMovies() {
  const newMovieData = await movieService.fetchMovies();
  makeMarkup(newMovieData);
}

markupMovies();
// function fetchGender

// function cutDate(data) {
//   return data.release_date ? data.release_date.split('-')[0] : '';
// }

// function createDate(movies) {
//   return movies.map(movie => ({
//     ...movie,
//     year: cutDate(movie),
//   }));
// }

// fetchMovie().then(data => {
//   makeMarkup(data);
//   // console.log(createDate(data));
// });
// // console.log(createDate(data));
