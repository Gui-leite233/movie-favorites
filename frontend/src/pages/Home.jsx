import { useEffect, useState } from "react";
import SearchBar from "/home/guilherme/Documentos/GitHub/movie-favorites/frontend/src/components/SeachBar.jsx";
import MovieCard from "/home/guilherme/Documentos/GitHub/movie-favorites/frontend/src/components/MovieCard.jsx";
import api from "../services/api";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    api.get("/discover").then((res) => setMovies(res.data));
  }, []);

  const handleSearch = async (query) => {
    const res = await api.get(`/search?query=${query}`);
    setMovies(res.data);
  };

  const handleFavorite = async (movie) => {
    const isFav = favorites.find((f) => f.movieId === movie.id);
    if (isFav) {
      await api.delete(`/favorites/${isFav.id}`);
      setFavorites(favorites.filter((f) => f.movieId !== movie.id));
    } else {
      const fav = {
        title: movie.title,
        movieId: movie.id,
        posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        rating: movie.vote_average,
      };
      const res = await api.post("/favorites", fav);
      setFavorites([...favorites, res.data]);
    }
  };

  useEffect(() => {
    api.get("/favorites").then((res) => setFavorites(res.data));
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold text-center py-6">
      ⭐Movie Favorites
      </h1>
      <SearchBar onSearch={handleSearch} />
      <div className="flex flex-wrap justify-center gap-6 p-6">
        {movies.map((m) => (
          <MovieCard
            key={m.id}
            movie={m}
            onFavorite={handleFavorite}
            isFavorite={favorites.some((f) => f.movieId === m.id)}
          />
        ))}
      </div>
    </div>
  );
}
