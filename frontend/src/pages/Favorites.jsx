import { useEffect, useState } from "react";
import api from "../services/api";
import MovieCard from "../components/MovieCard";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    api.get("/favorites").then((res) => setFavorites(res.data));
  }, []);

  const removeFavorite = async (movie) => {
    await api.delete(`/favorites/${movie.id}`);
    setFavorites(favorites.filter((f) => f.id !== movie.id));
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">💖 Meus Favoritos</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {favorites.length > 0 ? (
          favorites.map((m) => (
            <MovieCard
              key={m.id}
              movie={m}
              onFavorite={removeFavorite}
              isFavorite={true}
            />
          ))
        ) : (
          <p>Nenhum favorito ainda</p>
        )}
      </div>
    </div>
  );
}
