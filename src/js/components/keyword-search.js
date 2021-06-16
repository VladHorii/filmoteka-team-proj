// import KeywordApiSearch from './api-keyword-search';
import { MovieService } from '../api/api-movie-service';
import { markupMovies } from '../markup/hero-markup';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  moviesContainer: document.querySelector('.js-movies-container'),
  errorForm: document.querySelector('.header-notification'),
};

const movieService = new MovieService();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  if (!refs.errorForm.classList.contains('visually-hidden')) {
    refs.errorForm.classList.add('visually-hidden');
  }

  movieService.query = e.currentTarget.elements.query.value;
  if (movieService.query === '') {
    return refs.errorForm.classList.remove('visually-hidden');
  }
  movieService.resetPage();

  movieService
    .fetchMoviesWithQuery()
    .then(results => {
      if (results.length === 0) {
        throw new Error('Movie not found');
      }
      clearMoviesContainer();
      markupMovies(results);
    })
    .catch(error => {
      return refs.errorForm.classList.remove('visually-hidden');
    });
}

function clearMoviesContainer() {
  refs.moviesContainer.innerHTML = '';
}
