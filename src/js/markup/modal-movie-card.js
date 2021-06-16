import { MovieService } from '../api/api-movie-service';
import modalCardTpl from '../../templates/modal-card.hbs';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import Authorization from '../auth';

const auth = new Authorization();

import { AddToDataBase } from '../components/add-to-base';

import { defaults, success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';

defaults.delay = 4000;
defaults.styling = 'material';
defaults.icons = 'material';
// let notice = null;

const addToDataBase = new AddToDataBase();

const apiItems = new MovieService();

const cards = document.querySelector('.gallery__list');
const modal = document.querySelector('.js-modal-movie');
const backdrop = document.querySelector('.js-backdrop-movie');

cards.addEventListener('click', onModalOpen);
backdrop.addEventListener('click', onModalClose);

function updateButton(isExits, btnRef, btnName) {
  btnRef.textContent = isExits ? `Remove from ${btnName}` : `Add to ${btnName}`;
}

function addRemoveFilm(folder, isExits, filmID) {
  if (isExits) {
    addToDataBase.removeFrom(folder, filmID);

    success({
      text: `Фильм удалён из списка <${folder}>`,
    });
  } else {
    addToDataBase.addFilm(folder, filmID);

    success({
      text: `Фильм добавлен в список <${folder}>`,
    });
  }
}

function closeModalWithCard() {
  toggleIsOpenClass();
  clearMovieCard();
  toggleVisuallyHidden();
  window.removeEventListener('keydown', onModalClose);
}

function openAuthModal() {
  closeModalWithCard();
  document.querySelector('[data-modal]').classList.toggle('backdrop--hidden');
}

async function fetchMovieInfo(e) {
  try {
    const movieCard = await apiItems.fetchMovieInfo();
    modal.insertAdjacentHTML('beforeend', modalCardTpl(movieCard));
    toggleIsOpenClass(e);

    const isAuth = auth.getUserID();

    const btnWatchedRef = document.querySelector('.modal-button-watched');
    const btnQueueRef = document.querySelector('.modal-button-queue');

    if (!isAuth) {
      btnWatchedRef.addEventListener('click', openAuthModal);
      btnQueueRef.addEventListener('click', openAuthModal);
      return;
    }

    const filmID = movieCard.id;

    let isExitsInWatched = await addToDataBase.isExits('watched', filmID);
    let isExitsInQueue = await addToDataBase.isExits('queue', filmID);

    updateButton(isExitsInWatched, btnWatchedRef, 'watched');
    updateButton(isExitsInQueue, btnQueueRef, 'queue');

    btnWatchedRef.addEventListener('click', e => {
      addRemoveFilm('watched', isExitsInWatched, filmID);

      isExitsInWatched = !isExitsInWatched;
      updateButton(isExitsInWatched, btnWatchedRef, 'watched');
    });

    btnQueueRef.addEventListener('click', e => {
      addRemoveFilm('queue', isExitsInQueue, filmID);

      isExitsInQueue = !isExitsInQueue;
      updateButton(isExitsInQueue, btnQueueRef, 'queue');
    });
  } catch (err) {
    error({
      text: err,
    });
  }
}

// function notification(response) {
//   response
//     .then(r => {
//       success({
//         text: 'Фильм добавлен в список <просмотренных>',
//       });
//     })
//     .catch(er => {
//       error({
//         text: er,
//       });
//     });
// }

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
    closeModalWithCard();
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
