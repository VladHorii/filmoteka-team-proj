import axios from 'axios';

// const API_KEY = 'api_key=0558fb418099b1d6ef291e53504aa0aa';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export class MovieService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.key = '0558fb418099b1d6ef291e53504aa0aa';
  }

  async fetchMovies() {
    const response = await axios.get(`/trending/movie/day?api_key=${this.key}&page=${this.page}`);
    return response.data;
  }

  async fetchGenre() {
    const response = await axios.get(`/genre/movie/list?api_key=${this.key}&language=en-US'`);
    console.log(response.data);
    return response.data;
  }

  nextPage() {
    this.page += 1;
  }

  previousPage() {
    this.page -= 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
