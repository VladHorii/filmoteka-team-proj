// import KeywordApiSearch from './api-keyword-search';
import { MovieService } from '../api/api-movie-service';
import { markupMovies } from '../markup/hero-markup';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  moviesContainer: document.querySelector('.js-movies-container'),
  // errorForm: document.querySelector('.visually-hidden'),
};
// const keywordApiSearch = new KeywordApiSearch();
const movieService = new MovieService();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  movieService.query = e.currentTarget.elements.query.value;
  if (movieService.query === '') {
    return alert('Введи запрос');
  }
  movieService.resetPage();

  movieService.fetchMoviesWithQuery().then(results => {
    clearMoviesContainer();
    markupMovies(results);

    // if (keywordApiSearch.fetchMovies() == 0) {
    //     return errorForm;

    // }
  });
}

function clearMoviesContainer() {
  refs.moviesContainer.innerHTML = '';
}
