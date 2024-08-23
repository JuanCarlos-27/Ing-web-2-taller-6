import { Router } from 'express';

import { ReviewController } from '../controllers/review.controller.js';

const reviewRouter = Router();

reviewRouter.post('/', ReviewController.create);
reviewRouter.get('/', ReviewController.getAll);
reviewRouter.get('/:hostId', ReviewController.getInfoHost);
reviewRouter.put('/', ReviewController.update);
reviewRouter.delete('/:id', ReviewController.delete);

export { reviewRouter };
