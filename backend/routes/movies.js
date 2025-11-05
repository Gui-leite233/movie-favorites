import express from "express";
import {
  searchMovies,
  addFavorite,
  listFavorites,
  deleteFavorite,
  discoverMovies,
} from "../controllers/moviesController.js";

const router = express.Router();

router.get("/search", searchMovies);
router.get("/discover", discoverMovies);
router.get("/favorites", listFavorites);
router.post("/favorites", addFavorite);
router.delete("/favorites/:id", deleteFavorite);

export default router;
