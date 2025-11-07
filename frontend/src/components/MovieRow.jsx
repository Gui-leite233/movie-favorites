import MovieCard from "./MovieCard";
import "./MovieRow.css";

function MovieRow({
  title,
  movies,
  onAddFavorite,
  onRemoveFavorite,
  favorites = [],
}) {
  const favoriteIds = favorites.map((f) => f.movieId);

  return (
    <div className="movie-row">
      <h2 className="row-title">{title}</h2>
      <div className="row-movies">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id || movie.movieId}
            movie={movie}
            onAddFavorite={onAddFavorite}
            onRemoveFavorite={onRemoveFavorite}
            isFavorite={favoriteIds.includes(movie.id || movie.movieId)}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieRow;
