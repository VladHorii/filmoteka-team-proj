import { MovieService } from '../api/api-movie-service';
import { markupMovies } from '../markup/hero-markup';
import { paginationMobile, paginationTabDesk } from '../markup/pagination-markup';
const refs = {
  ulTag: document.querySelector('.pagination__list'),
  cardMarkup: document.querySelector('.gallery__list'),
  logo: document.querySelector('.header-logo-link'),
  home: document.querySelector('.js-home'),
  library: document.querySelector('.js-my-library-btn'),
  searchForm: document.querySelector('.js-search-form'),
  ulTagP: document.querySelector('.pagination__list-for-key'),
};

const movieService = new MovieService();

refs.searchForm.addEventListener('submit', onSearchP);

function onSearchP(e) {
  refs.ulTag.classList.add('visually-hidden');
}

movieService.fetchMovies().then(data => {
  let totalPages = data.total_pages;
  let page = data.page;
  window.totalPages = totalPages;

  window.addEventListener('resize', onPagination);
  refs.ulTag.addEventListener('click', onPages);
  refs.logo.addEventListener('click', onResetPage);
  refs.home.addEventListener('click', onResetPage);
  refs.library.addEventListener('click', onHidePagination);

  function onHidePagination() {
    refs.ulTag.classList.add('visually-hidden');
    refs.ulTagP.classList.add('visually-hidden');
  }

  function onResetPage(e) {
    refs.ulTag.classList.remove('visually-hidden');
    movieService.page = 1;
    refs.cardMarkup.innerHTML = '';
    onPagination();
  }

  function onPages(e) {
    let pageN = +e.target.dataset.number;

    async function makeNewPage() {
      movieService.page = pageN;
      refs.cardMarkup.innerHTML = '';
      const response = await movieService.fetchMovies();

      if (window.matchMedia('(max-width: 367px)').matches) {
        paginationMobile(totalPages, pageN, refs.ulTag);
      } else {
        paginationTabDesk(totalPages, pageN, refs.ulTag);
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
      paginationMobile(totalPages, page, refs.ulTag);
    } else {
      paginationTabDesk(totalPages, page, refs.ulTag);
    }
  }
});
