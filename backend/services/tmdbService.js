import axios from "axios";

const API_URL = "https://api.themoviedb.org/3/search/movie";

export const fetchMoviesFromTMDb = async (query) => {
  const res = await axios.get(API_URL, {
    params: {
      api_key: process.env.TMDB_API_KEY,
      query,
      language: "pt-BR",
    },
  });
  return res.data.results;
};
