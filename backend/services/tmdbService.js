import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  accept: "application/json",
  Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
};

export const fetchMoviesFromTMDb = async (query) => {
  try {
    const res = await axios.get(`${BASE_URL}/search/movie`, {
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
    const res = await axios.get(`${BASE_URL}/tv/popular`, {
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
      "Erro ao buscar séries populares:",
      error.response?.data || error.message
    );
    throw new Error("Falha ao buscar séries em destaque");
  }
};

export const fetchPopularMovies = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/movie/popular`, {
      headers,
      params: {
        language: "pt-BR",
        page: 1,
      },
    });
    return res.data.results;
  } catch (error) {
    console.error("Erro ao buscar filmes populares:", error);
    throw new Error("Falha ao buscar filmes populares");
  }
};

export const fetchTrendingMovies = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/trending/movie/week`, {
      headers,
      params: {
        language: "pt-BR",
      },
    });
    return res.data.results;
  } catch (error) {
    console.error("Erro ao buscar filmes em alta:", error);
    throw new Error("Falha ao buscar filmes em alta");
  }
};

export const fetchTopRatedMovies = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/movie/top_rated`, {
      headers,
      params: {
        language: "pt-BR",
        page: 1,
      },
    });
    return res.data.results;
  } catch (error) {
    console.error("Erro ao buscar filmes mais bem avaliados:", error);
    throw new Error("Falha ao buscar filmes mais bem avaliados");
  }
};

export const fetchUpcomingMovies = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/movie/upcoming`, {
      headers,
      params: {
        language: "pt-BR",
        page: 1,
      },
    });
    return res.data.results;
  } catch (error) {
    console.error("Erro ao buscar filmes que chegam em breve:", error);
    throw new Error("Falha ao buscar filmes que chegam em breve");
  }
};

export const fetchActionMovies = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/discover/movie`, {
      headers,
      params: {
        language: "pt-BR",
        with_genres: 28, 
        sort_by: "popularity.desc",
        page: 1,
      },
    });
    return res.data.results;
  } catch (error) {
    console.error("Erro ao buscar filmes de ação:", error);
    throw new Error("Falha ao buscar filmes de ação");
  }
};

export const fetchComedyMovies = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/discover/movie`, {
      headers,
      params: {
        language: "pt-BR",
        with_genres: 35,
        sort_by: "popularity.desc",
        page: 1,
      },
    });
    return res.data.results;
  } catch (error) {
    console.error("Erro ao buscar filmes de comédia:", error);
    throw new Error("Falha ao buscar filmes de comédia");
  }
};

export const fetchHorrorMovies = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/discover/movie`, {
      headers,
      params: {
        language: "pt-BR",
        with_genres: 27, 
        sort_by: "popularity.desc",
        page: 1,
      },
    });
    return res.data.results;
  } catch (error) {
    console.error("Erro ao buscar filmes de terror:", error);
    throw new Error("Falha ao buscar filmes de terror");
  }
};

export const fetchRomanceMovies = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/discover/movie`, {
      headers,
      params: {
        language: "pt-BR",
        with_genres: 10749, 
        sort_by: "popularity.desc",
        page: 1,
      },
    });
    return res.data.results;
  } catch (error) {
    console.error("Erro ao buscar filmes de romance:", error);
    throw new Error("Falha ao buscar filmes de romance");
  }
};

export const fetchSciFiMovies = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/discover/movie`, {
      headers,
      params: {
        language: "pt-BR",
        with_genres: 878, 
        sort_by: "popularity.desc",
        page: 1,
      },
    });
    return res.data.results;
  } catch (error) {
    console.error("Erro ao buscar filmes de ficção científica:", error);
    throw new Error("Falha ao buscar filmes de ficção científica");
  }
};

export const fetchDocumentaries = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/discover/movie`, {
      headers,
      params: {
        language: "pt-BR",
        with_genres: 99,
        sort_by: "popularity.desc",
        page: 1,
      },
    });
    return res.data.results;
  } catch (error) {
    console.error("Erro ao buscar documentários:", error);
    throw new Error("Falha ao buscar documentários");
  }
};
