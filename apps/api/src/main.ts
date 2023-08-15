import express from "express";
import routesRouter from './routes'

const app = express();

app.listen(3000, () => console.log('Listening on port 3000'))

app.use('/', routesRouter);