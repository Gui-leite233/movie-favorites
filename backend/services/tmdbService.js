import axios from "axios";

const SEARCH_URL = "https://api.themoviedb.org/3/search/movie";
const DISCOVER_URL = "https://api.themoviedb.org/3/tv/popular";

const headers = {
  accept: "application/json",
  Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
};

export const fetchMoviesFromTMDb = async (query) => {
  try {
    const res = await axios.get(SEARCH_URL, {
      headers,
      params: {
        query,
        language: "pt-BR",
      },
    });
    return res.data.results;
  } catch (error) {
    console.error(
      "Erro ao buscar filmes (search):",
      error.response?.data || error.message
    );
    throw new Error("Falha ao buscar filmes");
  }
};

export const fetchDiscoverMovies = async () => {
  try {
    const res = await axios.get(DISCOVER_URL, {
      headers,
      params: {
        sort_by: "popularity.desc",
        include_adult: false,
        language: "pt-BR",
        page: 1,
      },
    });
    return res.data.results;
  } catch (error) {
    console.error(
      "Erro ao buscar filmes (discover):",
      error.response?.data || error.message
    );
    throw new Error("Falha ao buscar filmes em destaque");
  }
};
