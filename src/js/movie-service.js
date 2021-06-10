// import axios from 'axios';

// import cardMarkupTpl from '../templates/movie-list.hbs';

// fetch('https://api.themoviedb.org/3/trending/all/day?api_key=0558fb418099b1d6ef291e53504aa0aa')
//   .then(response => {
//     if (response.ok) {
//       return response.json();
//     }
//     throw new Error(response.statusText);
//   })
//   .then(data => {
//     // console.log(data);
//     makeMarkup(data.results);
//   })
//   .catch(error => console.log(error));

// const cardMarkup = document.querySelector('.gallery');

// function makeMarkup(movie) {
//   cardMarkup.insertAdjacentHTML('beforeend', cardMarkupTpl(movie));
// }
