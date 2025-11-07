const API_BASE_URL = "http://localhost:3000";

export const api = {
  getAllCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/movies/categories`);
    return response.json();
  },

  discoverMovies: async () => {
    const response = await fetch(`${API_BASE_URL}/movies/discover`);
    return response.json();
  },

  searchMovies: async (query) => {
    const response = await fetch(
      `${API_BASE_URL}/movies/search?query=${query}`
    );
    return response.json();
  },

  getFavorites: async () => {
    const response = await fetch(`${API_BASE_URL}/movies/favorites`);
    return response.json();
  },

  addFavorite: async (movie) => {
    const response = await fetch(`${API_BASE_URL}/movies/favorites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: movie.name || movie.title,
        movieId: movie.id,
        posterUrl: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null,
        rating: movie.vote_average,
      }),
    });
    return response.json();
  },

  removeFavorite: async (id) => {
    await fetch(`${API_BASE_URL}/movies/favorites/${id}`, {
      method: "DELETE",
    });
  },

  shareFavorites: async () => {
    const response = await fetch(`${API_BASE_URL}/movies/favorites/share`, {
      method: "POST",
    });
    return response.json();
  },
};
