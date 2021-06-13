import axios from 'axios';

// const API_KEY = 'api_key=0558fb418099b1d6ef291e53504aa0aa';

// axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export class MovieService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.id = '';
    this.key = '371671d652209dac560f3fae909c95c7';
  }

  /* async fetchMovies() {
    const newCard = await axios.get(`/trending/all/week?${API_KEY}`);
    const response = await newCard.data.results;
    const page = await newCard.data.page;
    const totalPages = await newCard.data.total_pages;
    return response;
  } */

  async fetchMovies() {
    axios.defaults.baseURL = 'https://api.themoviedb.org/3/trending/';
    const response = await axios.get(`movie/day?api_key=${this.key}&page=${this.page}`);
    return response.data;
  }

  async fetchGenre() {
    const response = await axios.get(`/genre/movie/list?${API_KEY}&language=en-US'`);
    return response.data.genres;
  }

  async fetchMovieInfo() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${this.id}?${API_KEY}&language=en-US`,
      );
      const movieInfo = response.data;
      return movieInfo;
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

  // resetPage() {
  //   this.page = 1;
  // }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

// export const fetchMovie = async () => {
//   const newCard = await axios.get(`/trending/all/week?${API_KEY}`);
//   const response = await newCard.data.results;
//   const page = await newCard.data.page;
//   const totalPages = await newCard.data.total_pages;
//   return response;
// };

const fetchGenre = async () => {
  const response = await axios.get(`/genre/movie/list?${API_KEY}&language=en-US'`);
  return response.data.genres;
};

console.log(fetchGenre());
// export const fetchGenre = asyns() => {
//   const genreFetch = await axios.get(`/genre/movie/list?${API_KEY}&language=en-US`);
//   const response = await genreFetch.data;
//    console.log(response)

//   return response;

// }
