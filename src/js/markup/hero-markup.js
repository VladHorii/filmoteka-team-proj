import { MovieService } from '../api/api-movie-service';

import cardMarkupTpl from '../../templates/movie-list.hbs';

const cardMarkup = document.querySelector('.gallery__list');
const movieService = new MovieService();

export async function markupMovies(movieData = {}) {
  const responseGenre = await movieService.fetchGenre();
  const genreData = await responseGenre.genres;

  if (Object.keys(movieData).length === 0) {
    const responseMovie = await movieService.fetchMovies();
    movieData = await responseMovie.results;
  }

  movieData.forEach(film => {
    const dateOfRelease = film.release_date || film.first_air_date || 'unknown date';

    let genres = film.genres
      ? film.genres.map(genre => genre.name)
      : film.genre_ids.map(genre => genreData.find(g => g.id === genre).name);

    // if (film.genres) {
    //   genres = film.genres;
    // } else {
    //   genres = film.genre_ids.map(genre => genreData.find(g => g.id === genre).name);
    // }

    // let genres = film.genre_ids.map(genre => {
    //   if (gotGenres) {
    //     return genre.name;
    //   }
    //   return genreData.find(g => g.id === genre).name;
    // });

    if (genres.length > 2) {
      genres = genres.slice(0, 2);
      genres.push('Other');
    }
    genres = genres.join(', ');

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
