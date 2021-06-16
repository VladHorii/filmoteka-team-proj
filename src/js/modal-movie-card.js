import { MovieService } from './api/api-movie-service';
import modalCardTpl from '../templates/modal-card.hbs';

const apiItems = new MovieService();
// =========   modal   ==========

const cards = document.querySelector('.gallery__list');
const modal = document.querySelector('.js-modal-movie');
const backdrop = document.querySelector('.js-backdrop-movie');
// const modalCloseBtn = document.querySelector('icon-modal-close');

cards.addEventListener('click', onModalOpen);
backdrop.addEventListener('click', onModalClose);
// modalCloseBtn.addEventListener('click', onModalClose);

async function fetchMovieInfo() {
  try {
    const movieCard = await apiItems.fetchMovieInfo();
    const markupMovieCard = modalCardTpl(movieCard);
    modal.insertAdjacentHTML('beforeend', markupMovieCard);
  } catch (error) {
    console.log(error);
  }
}

function onModalOpen(e) {
  e.preventDefault();
  const isFilmCardLiEl = e.target.parentNode.classList.contains('gallery__list-link');

  if (!isFilmCardLiEl) {
    return;
  }

  apiItems.id = e.target.parentNode.dataset.id;
  toggleBackdropClass(e);
  fetchMovieInfo();
  window.addEventListener('keydown', onModalClose);
}

function toggleBackdropClass() {
  backdrop.classList.toggle('is-open');
}

function onModalClose(e) {
  const isCloseBtn = e.target.classList.contains('modal-movie__button-close');
  const isCloseOverlay = e.target.classList.contains('backdrop-movie');
  const isCloseEscBtn = e.code === 'Escape';

  if (isCloseOverlay || isCloseEscBtn || isCloseBtn) {
    toggleBackdropClass(e);
    clearMovieCard();
    window.removeEventListener('keydown', onModalClose);
  }
}

function clearMovieCard() {
  modal.innerHTML = '';
}
