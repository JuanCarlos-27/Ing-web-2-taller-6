import { Router } from 'express';
import { reviewRouter } from './review.router.js';

const router = Router();

router.use('/reviews', reviewRouter);

export default router;
