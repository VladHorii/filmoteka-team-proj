import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export class MovieService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.id = '';
    this.key = '0558fb418099b1d6ef291e53504aa0aa';
    this.id = '';
  }

  async fetchMovies() {
    const response = await axios.get(`/trending/movie/day?api_key=${this.key}&page=${this.page}`);
    return response.data;
  }

  async fetchGenre() {
    const response = await axios.get(`/genre/movie/list?api_key=${this.key}&language=en-US`);
    return response.data;
  }

  async fetchMovieInfo() {
    try {
      const response = await axios.get(`/movie/${this.id}?api_key=${this.key}&language=en-US`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
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
