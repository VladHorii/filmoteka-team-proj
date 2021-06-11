// import './sass/main.scss';
import ApiService from './api';
// import moviesListTpl from './templates/card.hbs';
import modalCardTpl from '../templates/modal-card.hbs';
const listItems = document.querySelector('.card');

const apiItems = new ApiService();

// apiService();

// async function apiService() {
//   const api = await apiItems.fetchItems();
//   const apiGenre = await apiItems.fetchGenre();
//   markupItems(api);
//   getGenre(apiGenre);
// }

// function markupItems(items) {
//   // console.log(moviesListTpl({ items }));

//   listItems.insertAdjacentHTML('beforeend', moviesListTpl({ items }));
// }

// function getGenre(genre) {
//   genre.forEach(e => {
//     const abc = document.querySelectorAll('.genre-item');
//     abc.forEach(a => {
//       if (Number(a.textContent) === e.id) {
//         a.textContent = e.name;
//       }
//     });
//   });
// }

// =========   modal   ==========

const cards = document.querySelector('.card');
const modal = document.querySelector('.js-modal');
const backdrop = document.querySelector('.js-backdrop');
// const modalCloseBtn = document.querySelector('.modal__button-close');

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

  const isFilmCardLiEl = e.target.parentNode.classList.contains('card__item');
  if (!isFilmCardLiEl) {
    return;
  }

  apiItems.id = e.target.parentNode.dataset.id;
  addLightboxClass(e);
  fetchMovieInfo();
  window.addEventListener('keydown', onModalClose);
}

function addLightboxClass() {
  backdrop.classList.add('is-open');
}

function onModalClose(e) {
  const isCloseBtn = e.target.classList.contains('modal__button-close');
  const isCloseOverlay = e.target.classList.contains('backdrop');
  const isCloseEscBtn = e.code === 'Escape';

  if (isCloseOverlay || isCloseEscBtn || isCloseBtn) {
    removeLightboxClass(e);
    clearMovieCard();
    window.removeEventListener('keydown', onModalClose);
  }
}

function removeLightboxClass() {
  backdrop.classList.remove('is-open');
}

function clearMovieCard() {
  modal.innerHTML = '';
}
