import { MovieService } from '../api/api-movie-service';

import cardMarkupTpl from '../../templates/movie-list.hbs';

const cardMarkup = document.querySelector('.gallery__list');
const movieService = new MovieService();

async function markupMovies() {
  const movieData = await movieService.fetchMovies().then(r => r.results);
  const genreData = await movieService.fetchGenre().then(r => r.genres);

  movieData.forEach(film => {
    const dateOfRelease = film.release_date || film.first_air_date || 'unknown date';

    let genres = film.genre_ids.map(genre => genreData.find(g => g.id === genre).name);

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
