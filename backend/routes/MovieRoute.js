import express from 'express';
import { 
    getMovieByCategory,
    getMovieDetails, 
    getMovieTrailers, 
    getSimilarMovies, 
    getTredingMovie } from '../controllers/movieController.js';

const router = express.Router();

router.get("/trending", getTredingMovie);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getSimilarMovies);
router.get("/:category", getMovieByCategory);

export default router;