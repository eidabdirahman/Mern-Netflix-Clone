import express from 'express';
import { 
    getSimilarTvs, 
    getTredingTv, 
    getTvDetails, 
    getTvsByCategory, 
    getTvTrailers } from '../controllers/tvController.js';


const router = express.Router();

router.get("/trending", getTredingTv);
router.get("/:id/trailer", getTvTrailers);
router.get("/:id/details", getTvDetails);
router.get("/:id/similar", getSimilarTvs);
router.get("/:category", getTvsByCategory);

export default router;