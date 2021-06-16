import { currentLinkNavClass, headerLibraryClass, headerHomeClass } from './constants';
import { markupMovies } from './markup/hero-markup';
import { MovieService } from './api/api-movie-service';
import { AddToDataBase } from './components/add-to-base';

import cardMarkupTpl from '../templates/movie-list.hbs';

const movieService = new MovieService();
const addToDataBase = new AddToDataBase();

const refs = {
  header: document.getElementById('page-header'),
  navMenu: document.getElementById('page-nav'),
  navLinks: document.querySelectorAll('.link-nav'),
};
refs.header.addEventListener('click', async e => {
  const target = e.target;
  const targetParent = target.closest('.logo');

  if (target.dataset.link === '' || targetParent) {
    e.preventDefault();

    const link = targetParent || target;
    const path = link.href.split('#')[1];

    refs.navLinks.forEach(link => link.classList.remove(currentLinkNavClass));

    refs.navMenu.querySelector(`[href='#${path}']`).classList.add(currentLinkNavClass);

    if (path === 'home') {
      refs.header.classList.replace(headerLibraryClass, headerHomeClass);
      markupMovies();
    } else {
      refs.header.classList.replace(headerHomeClass, headerLibraryClass);

      const list = new Set();

      document.querySelector('.gallery__list').textContent = '';

      const watchedList = await addToDataBase.getList('watched');
      const queueList = await addToDataBase.getList('queue');

      for (const key in watchedList) {
        list.add(watchedList[key]);
      }
      for (const key in queueList) {
        list.add(queueList[key]);
      }

      const movies = [];
      list.forEach(async element => {
        movieService.id = element;
        const film = await movieService.fetchMovieInfo();
        movies.push(film);
      });
      markupMovies(movies, true);
    }
  }
});
