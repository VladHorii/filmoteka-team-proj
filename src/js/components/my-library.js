import { markupMovies } from '../markup/hero-markup';
import { MovieService } from '../api/api-movie-service';
import { AddToDataBase } from './add-to-base';

const movieService = new MovieService();
const addToDataBase = new AddToDataBase();

async function setMarkup(folder) {
  const set = new Set();

  document.querySelector('.gallery__list').textContent = '';

  const list = await addToDataBase.getList(folder);

  for (const key in list) {
    set.add(list[key]);
  }

  const movies = [];
  set.forEach(async element => {
    movieService.id = element;
    const film = await movieService.fetchMovieInfo();
    movies.push(film);
  });
  markupMovies(movies, true);
}

async function setWatchedAndQueueMarkup() {
  setMarkup('watched');
  setMarkup('queue');
}

export { setWatchedAndQueueMarkup, setMarkup };
