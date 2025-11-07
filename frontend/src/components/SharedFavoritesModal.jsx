import { useState } from "react";
import MovieCard from "./MovieCard";
import "./SharedFavoritesModal.css";

function SharedFavoritesModal({ isOpen, onClose }) {
  const [shareUrl, setShareUrl] = useState("");
  const [sharedMovies, setSharedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLoadShared = async () => {
    if (!shareUrl.trim()) {
      setError("Por favor, insira um link válido");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const token = shareUrl.split("/shared/")[1]?.split("?")[0];

      if (!token) {
        setError("Link inválido. Use o formato correto.");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/movies/shared/${token}`
      );

      if (!response.ok) {
        throw new Error("Lista não encontrada");
      }

      const movies = await response.json();
      setSharedMovies(movies);
      setError("");
    } catch (err) {
      console.error("Erro ao carregar favoritos compartilhados:", err);
      setError("Erro ao carregar a lista. Verifique o link e tente novamente.");
      setSharedMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setShareUrl("");
    setSharedMovies([]);
    setError("");
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🔗 Ver Favoritos Compartilhados</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="share-input-group">
            <input
              type="text"
              placeholder="Cole o link compartilhado aqui..."
              value={shareUrl}
              onChange={(e) => setShareUrl(e.target.value)}
              className="share-url-input"
              onKeyPress={(e) => e.key === "Enter" && handleLoadShared()}
            />
            <button
              onClick={handleLoadShared}
              className="load-btn"
              disabled={loading}
            >
              {loading ? "Carregando..." : "Ver Favoritos"}
            </button>
            {shareUrl && (
              <button onClick={handleClear} className="clear-share-btn">
                Limpar
              </button>
            )}
          </div>

          {error && <div className="error-message">⚠️ {error}</div>}

          {sharedMovies.length > 0 && (
            <div className="shared-movies-container">
              <h3 className="shared-title">
                📺 {sharedMovies.length} filme(s) favorito(s)
              </h3>
              <div className="shared-movies-grid">
                {sharedMovies.map((movie) => (
                  <MovieCard
                    key={movie.id || movie.movieId}
                    movie={movie}
                    onAddFavorite={() => {}}
                    onRemoveFavorite={() => {}}
                    isFavorite={false}
                  />
                ))}
              </div>
            </div>
          )}

          {!loading && !error && sharedMovies.length === 0 && shareUrl && (
            <div className="empty-state">
              <p>Nenhum filme encontrado nesta lista compartilhada.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SharedFavoritesModal;
