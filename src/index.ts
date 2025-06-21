import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';
import connectDB from './config';
import { env } from './config/env';

connectDB();

const app: Express = express();

// ✅ Allow all origins using cors (NO credentials)
app.use(cors({
  origin: '*' // Allow all origins
}));

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', (req, res) => res.json({ message: 'server is running' }));
app.use('/api/v1', routes);

app.use(errorHandler);

app.listen(env.PORT, () => console.log(`🚀 Server running on port ${env.PORT}`));
