import { useState, useEffect } from "react";
import MovieRow from "./components/MovieRow";
import SharedFavoritesModal from "./components/SharedFavoritesModal";
import { api } from "./services/api";
import "./App.css";

function App() {
  const [categories, setCategories] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [shareUrl, setShareUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [showSharedModal, setShowSharedModal] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        try {
          setSearching(true);
          const results = await api.searchMovies(searchQuery);
          setSearchResults(results);
        } catch (error) {
          console.error("Erro na busca:", error);
          setSearchResults([]);
        } finally {
          setSearching(false);
        }
      } else {
        setSearchResults([]);
        setSearching(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [categoriesData, favs] = await Promise.all([
        api.getAllCategories(),
        api.getFavorites(),
      ]);
      setCategories(categoriesData);
      setFavorites(favs);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFavorite = async (movie) => {
    try {
      const newFav = await api.addFavorite(movie);
      setFavorites([...favorites, newFav]);
    } catch (error) {
      console.error("Erro ao adicionar favorito:", error);
    }
  };

  const handleRemoveFavorite = async (movieId) => {
    try {
      const favorite = favorites.find((f) => f.movieId === movieId);
      if (favorite) {
        await api.removeFavorite(favorite.id);
        setFavorites(favorites.filter((f) => f.id !== favorite.id));
      }
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
    }
  };

  const handleShare = async () => {
    try {
      const response = await api.shareFavorites();
      setShareUrl(response.shareUrl);
      navigator.clipboard.writeText(response.shareUrl);
      alert("Link copiado para a área de transferência!");
    } catch (error) {
      console.error("Erro ao compartilhar:", error);
      alert("Erro ao gerar link de compartilhamento");
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  const movieCategories = [
    { key: "trending", title: "🔥 Em Alta Esta Semana", icon: "🔥" },
    { key: "popular", title: "⭐ Filmes Populares", icon: "⭐" },
    { key: "topRated", title: "👑 Mais Bem Avaliados", icon: "👑" },
    { key: "upcoming", title: "🎬 Em Breve", icon: "🎬" },
    { key: "action", title: "💥 Ação", icon: "💥" },
    { key: "comedy", title: "😂 Comédia", icon: "😂" },
    { key: "horror", title: "👻 Terror", icon: "👻" },
    { key: "romance", title: "💕 Romance", icon: "💕" },
    { key: "sciFi", title: "🚀 Ficção Científica", icon: "🚀" },
    { key: "documentaries", title: "📚 Documentários", icon: "📚" },
    { key: "series", title: "📺 Séries Populares", icon: "📺" },
  ];

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Filmes Verzel</h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar filme"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button onClick={clearSearch} className="clear-btn">
              ✕
            </button>
          )}
          {searching && <span className="search-loading">🔍</span>}
        </div>

        <div className="header-buttons">
          <button
            onClick={() => setShowSharedModal(true)}
            className="view-shared-btn"
          >
            Ver Compartilhados
          </button>

          {favorites.length > 0 && (
            <button onClick={handleShare} className="share-btn">
              Compartilhar Meus Favoritos
            </button>
          )}
        </div>
      </header>

      <main className="app-main">
        {searchQuery && (
          <div className="search-info">
            {searching ? (
              <p>Buscando...</p>
            ) : (
              <p>
                {searchResults.length > 0
                  ? `${searchResults.length} resultado(s) encontrado(s)`
                  : "Nenhum resultado encontrado"}
              </p>
            )}
          </div>
        )}

        {searchResults.length > 0 ? (
          <MovieRow
            title="Resultados"
            movies={searchResults}
            onAddFavorite={handleAddFavorite}
            onRemoveFavorite={handleRemoveFavorite}
            favorites={favorites}
          />
        ) : (
          <>
            {favorites.length > 0 && (
              <MovieRow
                title="Meus Favoritos"
                movies={favorites}
                onAddFavorite={handleAddFavorite}
                onRemoveFavorite={handleRemoveFavorite}
                favorites={favorites}
              />
            )}

            {movieCategories.map(
              ({ key, title }) =>
                categories[key] &&
                categories[key].length > 0 && (
                  <MovieRow
                    key={key}
                    title={title}
                    movies={categories[key]}
                    onAddFavorite={handleAddFavorite}
                    onRemoveFavorite={handleRemoveFavorite}
                    favorites={favorites}
                  />
                )
            )}
          </>
        )}
      </main>

      <SharedFavoritesModal
        isOpen={showSharedModal}
        onClose={() => setShowSharedModal(false)}
      />
    </div>
  );
}

export default App;
