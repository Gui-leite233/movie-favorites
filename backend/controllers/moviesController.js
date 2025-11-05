import prisma from "../prisma/prisma.config.ts";
import { fetchMoviesFromTMDb } from "../services/tmdbService.js";

export const searchMovies = async (req, res) => {
  const { query } = req.query;
  const data = await fetchMoviesFromTMDb(query);
  res.json(data);
};

export const listFavorites = async (req, res) => {
  const favorites = await prisma.favorite.findMany();
  res.json(favorites);
};

export const addFavorite = async (req, res) => {
  const { title, movieId, posterUrl, rating } = req.body;
  const newFav = await prisma.favorite.create({ data: { title, movieId, posterUrl, rating } });
  res.json(newFav);
};

export const deleteFavorite = async (req, res) => {
  const id = Number(req.params.id);
  await prisma.favorite.delete({ where: { id } });
  res.sendStatus(204);
};
