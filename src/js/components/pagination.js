import { MovieService } from '../api/api-movie-service';
import { markupMovies } from '../markup/hero-markup';
import { paginationMobile, paginationTabDesk } from '../markup/pagination-markup';
const ulTag = document.querySelector('.pagination__list');
const cardMarkup = document.querySelector('.gallery__list');
const logo = document.querySelector('.header-logo-link');
const home = document.querySelector('.js-home');
const library = document.querySelector('.js-my-library-btn');
const searchForm = document.querySelector('.js-search-form');
const movieService = new MovieService();

searchForm.addEventListener('submit', onSearchP);

function onSearchP(e) {
  ulTag.classList.add('visually-hidden');
}

movieService.fetchMovies().then(data => {
  let totalPages = data.total_pages;
  let page = data.page;
  window.totalPages = totalPages;

  window.addEventListener('resize', onPagination);
  ulTag.addEventListener('click', onPages);
  logo.addEventListener('click', onResetPage);
  home.addEventListener('click', onResetPage);
  library.addEventListener('click', onHidePagination);

  function onHidePagination() {
    ulTag.classList.add('visually-hidden');
  }

  function onResetPage(e) {
    ulTag.classList.remove('visually-hidden');
    movieService.page = 1;
    cardMarkup.innerHTML = '';
    onPagination();
  }

  function onPages(e) {
    let pageN = +e.target.dataset.number;

    async function makeNewPage() {
      movieService.page = pageN;
      cardMarkup.innerHTML = '';
      const response = await movieService.fetchMovies();

      if (window.matchMedia('(max-width: 367px)').matches) {
        paginationMobile(totalPages, pageN, ulTag);
      } else {
        paginationTabDesk(totalPages, pageN, ulTag);
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

  onPagination();

  function onPagination() {
    if (window.matchMedia('(max-width: 367px)').matches) {
      paginationMobile(totalPages, page, ulTag);
    } else {
      paginationTabDesk(totalPages, page, ulTag);
    }
  }
});
