import { MovieService } from './api-movie-service';

// import { cutGenresListForHero } from './data/data';

import cardMarkupTpl from '../templates/movie-list.hbs';

const cardMarkup = document.querySelector('.gallery__list');
const movieService = new MovieService();

async function markupMovies() {
  const movieData = await movieService.fetchMovies().then(r => r.results);
  const genreData = await movieService.fetchGenre().then(r => r.genres);
  makeMarkup(movieData, genreData);
  getGenre(genreData);

  // console.log(genreData);
  // createYear(movie);
  // console.log(createYear(movie));
}

markupMovies();

function makeMarkup(movies, genres) {
  // console.log(cardMarkupTpl({ movies }));
  cardMarkup.insertAdjacentHTML('beforeend', cardMarkupTpl({ movies }, { genres }));
}

function getGenre(genre) {
  genre.forEach(e => {
    const movieGenre = document.querySelectorAll('.gallery-title-block__item');
    movieGenre.forEach(genreName => {
      if (Number(genreName.textContent) === e.id) {
        genreName.textContent = e.name;
      }
    });
  });
}

export { getGenre, makeMarkup };

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
//   console.log(createDate(data));
// });
// console.log(createDate(data));
