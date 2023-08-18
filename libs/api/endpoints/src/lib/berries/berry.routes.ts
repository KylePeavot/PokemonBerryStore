import express from 'express';
import { BerryController } from './berry.controller';

const router = express.Router();
const controller = new BerryController();

router.get('/', controller.getBerries);

export default router;
