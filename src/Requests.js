const API_KEY="d4e0180f83e345698822c6acd39e7229"


const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchToprated:`/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchAnimationMovies: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
    fetchWarMovies:  `/discover/movie?api_key=${API_KEY}&with_genres=10752`,
    fetchHorrorMoviews: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMoviews: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`
}

// https://api.themoviedb.org/3/search/movie?api_key=db95773a7fb212ba790d71f6adac0e7e&query=cars

export default requests