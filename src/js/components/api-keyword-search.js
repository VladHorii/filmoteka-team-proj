const BASE_URL = 'https://api.themoviedb.org/3';

export default class KeywordApiSearch {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        
    }
    
    fetchMovies() {
           const url = `${BASE_URL}/search/movie?api_key=0558fb418099b1d6ef291e53504aa0aa&query=${this.searchQuery}&page=${this.page}&language=en-US`;

            return fetch(url)
             .then(response => response.json())
                .then(({results}) => {
                    this.incrementPage();
                    return results;
             });
    }

    incrementPage() {
        this.page += 1;
    }

    // resetPage() {
    //     this.page = 1;
    // }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

}