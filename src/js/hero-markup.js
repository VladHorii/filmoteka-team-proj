import { MovieService } from './api-movie-service';

import cardMarkupTpl from '../templates/movie-list.hbs';

const cardMarkup = document.querySelector('.gallery__list');
const movieService = new MovieService();

async function markupMovies() {
  const movieData = await movieService.fetchMovies().then(r => r.results);
  const genreData = await movieService.fetchGenre().then(r => r.genres);

  movieData.forEach(film => {
    const dateOfRelease = film.release_date || film.first_air_date || 'unknown date';

    const genres = film.genre_ids
      .map((genre, idx) => genreData.find(g => g.id === genre).name)
      .slice(0, 3)
      .join(', ');

    const card = {
      id: film.id,
      posterPath: film.poster_path,
      title: film.title || film.name,
      relDate: dateOfRelease.split('-')[0],
      genres,
    };
    makeMarkup(card);
  });
}

markupMovies();

function makeMarkup(movies) {
  cardMarkup.insertAdjacentHTML('beforeend', cardMarkupTpl(movies));
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

function cutGenresList(array) {
  return array
    .map(genre => genre.name)
    .slice(0, 3)
    .flat();
}

// function yearOfDate(obj) {
//   return obj.release_date ? obj.release_date.split('-')[0] : '';
// }

//=======================
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
