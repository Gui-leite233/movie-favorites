import express from "express";
import {
  searchMovies,
  addFavorite,
  listFavorites,
  deleteFavorite,
  discoverMovies,
  shareFavorites,
  getSharedFavorites,
  getAllCategories,
} from "../controllers/moviesController.js";

const router = express.Router();

router.get("/search", searchMovies);
router.get("/discover", discoverMovies);
router.get("/categories", getAllCategories);
router.get("/favorites", listFavorites);
router.post("/favorites", addFavorite);
router.delete("/favorites/:id", deleteFavorite);
router.post("/favorites/share", shareFavorites);
router.get("/shared/:token", getSharedFavorites);

export default router;
