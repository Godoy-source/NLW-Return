import { routes } from './routes';
import express from 'express';
import cors from 'cors';

const app = express();

// controle de segurança outros fronts nao entrarem no back
app.use(cors());

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
    console.log('listening');
});