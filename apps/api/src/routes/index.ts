import express from 'express';
import {
	berryRouter,
	locationRouter,
} from '@pokemon-berry-store/api/endpoints';

const router = express.Router();

router.use('/berries', berryRouter);
router.use('/locations', locationRouter);

export default router;
