import { PrismaClient } from "@prisma/client";
import {
  fetchMoviesFromTMDb,
  fetchDiscoverMovies,
  fetchPopularMovies,
  fetchTrendingMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchActionMovies,
  fetchComedyMovies,
  fetchHorrorMovies,
  fetchRomanceMovies,
  fetchSciFiMovies,
  fetchDocumentaries,
} from "../services/tmdbService.js";
import * as crypto from "crypto";

const prisma = new PrismaClient();

export const searchMovies = async (req, res) => {
  const { query } = req.query;
  const data = await fetchMoviesFromTMDb(query);
  res.json(data);
};

export const listFavorites = async (req, res) => {
  const favorites = await prisma.favorite.findMany();
  res.json(favorites);
};

export const discoverMovies = async (req, res) => {
  const data = await fetchDiscoverMovies();
  res.json(data);
};

export const getAllCategories = async (req, res) => {
  try {
    const [
      series,
      popular,
      trending,
      topRated,
      upcoming,
      action,
      comedy,
      horror,
      romance,
      sciFi,
      documentaries,
    ] = await Promise.all([
      fetchDiscoverMovies(),
      fetchPopularMovies(),
      fetchTrendingMovies(),
      fetchTopRatedMovies(),
      fetchUpcomingMovies(),
      fetchActionMovies(),
      fetchComedyMovies(),
      fetchHorrorMovies(),
      fetchRomanceMovies(),
      fetchSciFiMovies(),
      fetchDocumentaries(),
    ]);

    res.json({
      series,
      popular,
      trending,
      topRated,
      upcoming,
      action,
      comedy,
      horror,
      romance,
      sciFi,
      documentaries,
    });
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    res.status(500).json({ error: "Erro ao buscar categorias de filmes" });
  }
};

export const addFavorite = async (req, res) => {
  const { title, movieId, posterUrl, rating } = req.body;
  const newFav = await prisma.favorite.create({
    data: { title, movieId, posterUrl, rating },
  });
  res.json(newFav);
};

export const deleteFavorite = async (req, res) => {
  const id = Number(req.params.id);
  await prisma.favorite.delete({ where: { id } });
  res.sendStatus(204);
};

export const shareFavorites = async (req, res) => {
  try {
    const favorites = await prisma.favorite.findMany();

    if (favorites.length === 0) {
      return res
        .status(400)
        .json({ error: "Nenhum favorito para compartilhar" });
    }

    const token = crypto.randomBytes(16).toString("hex");

    const sharedList = await prisma.sharedList.create({
      data: {
        token,
        favorites: JSON.stringify(favorites),
      },
    });

    res.json({
      token: sharedList.token,
      shareUrl: `${req.protocol}://${req.get("host")}/movies/shared/${
        sharedList.token
      }`,
    });
  } catch (error) {
    console.error("Erro ao compartilhar: ", error);
    res.status(500).json({ error: "Erro no compartilhamento" });
  }
};

export const getSharedFavorites = async (req, res) => {
  try {
    const { token } = req.params;

    const sharedList = await prisma.sharedList.findUnique({
      where: { token },
    });

    if (!sharedList) {
      return res.status(400).json({ error: "Lista não encontrada" });
    }
    const favorites = JSON.parse(sharedList.favorites);
    res.json(favorites);
  } catch (error) {
    console.error("Erro na busca de compartilhamento: ", error);
    res.status(500).json({ error: "Erro na busca de lista" });
  }
};
