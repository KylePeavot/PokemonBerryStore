import express from 'express';
import { LocationController } from './location.controller';

const router = express.Router();
const controller = new LocationController();

router.get('/', controller.getLocations);

export default router;
