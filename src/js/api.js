import axios from 'axios';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.key = '371671d652209dac560f3fae909c95c7';
    this.id = '';
  }

  async fetchItems() {
    axios.defaults.baseURL = 'https://api.themoviedb.org/3/trending/';
    const response = await axios.get(`movie/day?api_key=${this.key}&page=${this.page}`);
    return response.data;
  }

  async fetchGenre() {
    axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
    const response = await axios.get(`genre/movie/list?api_key=${this.key}&language=en-US`);
    return response.data.genres;
  }

  async fetchMovieInfo() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${this.id}?api_key=${this.key}&language=en-US`,
      );
      const movieInfo = response.data;
      return movieInfo;
    } catch (error) {
      console.log(error);
    }
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    return (this.searchQuery = newQuery);
  }

  nextPage() {
    this.page += 1;
  }

  previousPage() {
    this.page -= 1;
  }

  soughtPage(page) {
    return (this.page = page);
  }
}
