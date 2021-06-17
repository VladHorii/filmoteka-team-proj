import axios from 'axios';
import { Spinner } from '../components/spinner';

const spinner = new Spinner();
// spinner.open();

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export class MovieService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.id = '';
    this.key = '0558fb418099b1d6ef291e53504aa0aa';
  }

  async fetchMovies() {
    spinner.open();
    const response = await axios.get(`/trending/movie/day?api_key=${this.key}&page=${this.page}`);
    spinner.close();
    return response.data;
  }

  async fetchGenre() {
    spinner.open();
    const response = await axios.get(`/genre/movie/list?api_key=${this.key}&language=en-US`);
    spinner.close();
    return response.data;
  }

  async fetchMovieInfo() {
    try {
      spinner.open();
      const response = await axios.get(`/movie/${this.id}?api_key=${this.key}&language=en-US`);
      spinner.close();
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async fetchMoviesWithQuery() {
    try {
      spinner.open();
      const response = await axios.get(
        `/search/movie/?api_key=${this.key}&query=${this.searchQuery}&page=${this.page}&language=en-US`,
      );
      spinner.close();
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  nextPage() {
    this.page += 1;
  }

  previousPage() {
    this.page -= 1;
  }
  resetPage() {
    this.page = 1;
  }

  setPage(page) {
    this.page = page;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
