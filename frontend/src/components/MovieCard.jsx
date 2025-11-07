import { useState } from "react";
import "./MovieCard.css";

function MovieCard({ movie, onAddFavorite, onRemoveFavorite, isFavorite }) {
  const [isHovered, setIsHovered] = useState(false);

  const posterUrl =
    movie.posterUrl ||
    (movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null);

  const title = movie.title || movie.name;
  const rating = movie.rating || movie.vote_average;

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    const movieId = movie.movieId || movie.id;

    if (isFavorite) {
      onRemoveFavorite(movieId);
    } else {
      onAddFavorite(movie);
    }
  };

  return (
    <div
      className="movie-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {posterUrl ? (
        <img src={posterUrl} alt={title} className="movie-poster" />
      ) : (
        <div className="movie-poster-placeholder">
          <span>Sem imagem</span>
        </div>
      )}

      {isHovered && (
        <div className="movie-overlay">
          <h3 className="movie-title">{title}</h3>
          {rating && <div className="movie-rating">⭐ {rating.toFixed(1)}</div>}
          <button
            className={`favorite-btn ${isFavorite ? "favorited" : ""}`}
            onClick={handleFavoriteClick}
          >
            {isFavorite ? "Remover" : "Favoritar"}
          </button>
        </div>
      )}
    </div>
  );
}

export default MovieCard;
