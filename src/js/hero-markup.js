import { MovieService } from './api-movie-service';

// import { cutGenresListForHero } from './data/data';

import cardMarkupTpl from '../templates/movie-list.hbs';

const cardMarkup = document.querySelector('.gallery__list');
const movieService = new MovieService();

async function markupMovies() {
  const movieData = await movieService.fetchMovies().then(r => r.results);
  const genreData = await movieService.fetchGenre().then(r => r.genres);

  console.log(genreData);
  makeMarkup(movieData, genreData);
  console.log(genreData);
  getGenre(genreData);
  cutGenresList(genreData);
  console.log(cutGenresList(genreData));
  // createGenresFromID(genreData);

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
    // const fullDateOfRelease = film.release_date || film.first_air_date || '0000-00-00';
    // const yearOfRelease = fullDateOfRelease.split('-')[0];
    movieGenre.forEach(genreName => {
      if (Number(genreName.textContent) === e.id) {
        genreName.textContent = e.name;
      }
    });
  });
}

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

//=========================

// const fullDateOfRelease = film.release_date || film.first_air_date || '0000-00-00';
// const yearOfRelease = fullDateOfRelease.split('-')[0];
