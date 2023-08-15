import express from 'express';
import cors from 'cors';
import routesRouter from './routes';

const app = express();
app.use(cors());
app.listen(3000, () => console.log('Listening on port 3000'));

app.use('/', routesRouter);
