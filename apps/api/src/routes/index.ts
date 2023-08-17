import express from 'express';
import { berryRouter } from '@pokemon-berry-store/api/endpoints';

const router = express.Router();

router.use('/berries', berryRouter);

export default router;
