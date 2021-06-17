//import KeywordApiSearch from './api-keyword-search';
import { MovieService } from '../api/api-movie-service';
import { markupMovies } from '../markup/hero-markup';
import { paginationMobile, paginationTabDesk } from '../markup/pagination-markup';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  moviesContainer: document.querySelector('.js-movies-container'),
  errorForm: document.querySelector('.header-notification'),
  ulTagP: document.querySelector('.pagination__list-for-key'),
  cardMarkup: document.querySelector('.gallery__list'),
};

const movieService = new MovieService();

refs.searchForm.addEventListener('submit', onSearch);

export function onSearch(e) {
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
      if (results.results.length === 0) {
        throw new Error('Movie not found');
      }

      window.addEventListener('resize', onPagination);
      let totalPages = results.total_pages;
      let page = results.page;

      refs.ulTagP.addEventListener('click', onPages);

      function onPages(e) {
        let pageN = +e.target.dataset.number;

        async function makeNewPage() {
          movieService.page = pageN;
          refs.cardMarkup.innerHTML = '';
          const response = await movieService.fetchMoviesWithQuery();

          if (window.matchMedia('(max-width: 367px)').matches) {
            paginationMobile(totalPages, pageN, refs.ulTagP);
          } else {
            paginationTabDesk(totalPages, pageN, refs.ulTagP);
          }
          markupMovies(response.results);
        }

        if (e.target.classList.contains('btn-next')) {
          movieService.nextPage();
          makeNewPage();
        } else if (e.target.classList.contains('btn-prev')) {
          movieService.previousPage();
          makeNewPage();
        } else {
          makeNewPage();
        }
      }

      function onPagination() {
        if (window.matchMedia('(max-width: 367px)').matches) {
          paginationMobile(totalPages, page, refs.ulTagP);
        } else {
          paginationTabDesk(totalPages, page, refs.ulTagP);
        }
      }

      onPagination();
      clearMoviesContainer();
      markupMovies(results.results);
    })
    .catch(error => {
      return refs.errorForm.classList.remove('visually-hidden');
    });
}

export function clearMoviesContainer() {
  refs.moviesContainer.innerHTML = '';
}
