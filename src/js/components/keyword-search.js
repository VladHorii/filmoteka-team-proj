import KeywordApiSearch from './api-keyword-search';
import moviesTpl from '../../../src/templates/movie-list.hbs';


const refs = {
    searchForm: document.querySelector('.js-search-form'),
    moviesContainer: document.querySelector('.js-movies-container'),
    // errorForm: document.querySelector('.visually-hidden'),
};
const keywordApiSearch = new KeywordApiSearch();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
    e.preventDefault();
    
    keywordApiSearch.query = e.currentTarget.elements.query.value;
    if (keywordApiSearch.query === '') {
        return alert('Введи запрос');
    }
    // keywordApiSearch.resetPage();
    keywordApiSearch.fetchMovies().then(results => {
        clearMoviesContainer();
        appendMoviesMarkup(results);

        // if (keywordApiSearch.fetchMovies() == 0) {
        //     return errorForm;

        // }
    });
}

function appendMoviesMarkup(results) {
    refs.moviesContainer.insertAdjacentHTML('beforeend', moviesTpl(results));
}

function clearMoviesContainer() {
    refs.moviesContainer.innerHTML = '';
}