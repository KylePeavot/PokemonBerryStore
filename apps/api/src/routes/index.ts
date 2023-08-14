import express from "express";
import berryRouter from './berries/berry.routes';

const router = express.Router();

router.use('/berries', berryRouter);

export default router;