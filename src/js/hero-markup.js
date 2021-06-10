import { fetchMovie, getGenre } from './api-movie-service';

import cardMarkupTpl from '../templates/movie-list.hbs';

const cardMarkup = document.querySelector('.gallery');

function makeMarkup(movie) {
  cardMarkup.insertAdjacentHTML('beforeend', cardMarkupTpl(movie));
}

fetchMovie().then(async res => {
  getGenre();
  res.forEach(film => {
    const dateOfRelease = film.release_date || film.first_air_date || '0000-00-00';
    const card = {
      posterPath: film.poster_path,
      title: film.title || film.name,
      relDate: dateOfRelease.split('-')[0],
      genre_ids: 0,
    };
    makeMarkup(card);
    // console.log(film.release_date.split('-') || film.first_air_date || 'error');
  });

  // const date = '2021-01-22';
  // console.log(date.split('-')[0]);
  // split('-')[1]
  // const data = {
  //   title: res.title || res.name,
  // };
  // const releseDate = await res.release_date;
  // console.log(releseDate);
  // console.log(data);
  // makeMarkup(data);
});
