import axios from 'axios';

const API_KEY = 'api_key=0558fb418099b1d6ef291e53504aa0aa';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export const fetchMovie = async () => {
  const newCard = await axios.get(`/trending/all/day?${API_KEY}`);
  const response = await newCard.data.results;
  return response;
};
