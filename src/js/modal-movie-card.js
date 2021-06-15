import { MovieService } from './api-movie-service';
import modalCardTpl from '../templates/modal-card.hbs';
import { disableBodyScroll } from 'body-scroll-lock';
import { enableBodyScroll } from 'body-scroll-lock';

import { AddToDataBase } from './components/add-to-base';

const addToDataBase = new AddToDataBase();

const apiItems = new MovieService();

const cards = document.querySelector('.gallery__list');
const modal = document.querySelector('.js-modal-movie');
const backdrop = document.querySelector('.js-backdrop-movie');

cards.addEventListener('click', onModalOpen);
backdrop.addEventListener('click', onModalClose);

async function fetchMovieInfo(e) {
  try {
    const movieCard = await apiItems.fetchMovieInfo();
    modal.insertAdjacentHTML('beforeend', modalCardTpl(movieCard));
    toggleIsOpenClass(e);

    document.querySelector('.modal-button-watched').addEventListener('click', e => {
      const filmID = e.currentTarget.dataset.id;
      addToDataBase
        .addToWatched(filmID)
        .then(r => console.log('Фильм добавлен'))
        .catch(error => {
          console.log(error.message);
        });
    });
    document.querySelector('.modal-button-queue').addEventListener('click', e => {
      const filmID = e.currentTarget.dataset.id;
      addToDataBase
        .addToQueue(filmID)
        .then(r => console.log('Фильм добавлен'))
        .catch(error => {
          console.log(error.message);
        });
    });
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

  const isBackdropOpen = backdrop.classList.contains('js-backdrop-movie');
  if (isBackdropOpen) {
    toggleVisuallyHidden();
  }

  apiItems.id = e.target.parentNode.dataset.id;
  fetchMovieInfo();
  window.addEventListener('keydown', onModalClose);

  disableBodyScroll(modal);
}

function onModalClose(e) {
  const isCloseBtn = e.target.classList.contains('modal-movie__button-close');
  const isCloseOverlay = e.target.classList.contains('backdrop-movie');
  const isCloseEscBtn = e.code === 'Escape';

  if (isCloseOverlay || isCloseEscBtn || isCloseBtn) {
    toggleIsOpenClass(e);
    clearMovieCard();
    toggleVisuallyHidden();
    window.removeEventListener('keydown', onModalClose);
  }

  enableBodyScroll(modal);
}

function toggleIsOpenClass() {
  backdrop.classList.toggle('is-open');
}

function clearMovieCard() {
  modal.innerHTML = '';
}

function toggleVisuallyHidden() {
  mybutton.classList.toggle('visually-hidden');
}
