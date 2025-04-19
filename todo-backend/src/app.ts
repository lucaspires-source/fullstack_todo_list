// backend/src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import * as swaggerUI from 'swagger-ui-express';
import { todoRouter } from './routes/todo.route'
import { errorHandler } from './middlewares/errorHandler';
import swaggerSpec from './config/swagger';
import { Request, Response,} from 'express';

export const createApp = () => {
    const app = express();
  
    // 1. Environment Configuration
    app.set('trust proxy', 1); // Trust first proxy
    app.disable('x-powered-by');
  
    // 2. Security Middleware
    app.use(helmet({
      contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false
    }));
     
    app.use(cors({
      origin: [
        'http://frontend',
        'http://localhost:5173',      ].filter(Boolean) as string[],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
      maxAge: 86400
    }));
  
    // 3. Request Processing
    app.use(express.json({ limit: '10kb' }));
    app.use(express.urlencoded({ extended: true }));
  
    // 4. Compression
    app.use(compression());
  
    // 5. Logging
    app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
  
    // 6. API Documentation
    app.use('/api-docs', 
      swaggerUI.serve,
      swaggerUI.setup(swaggerSpec, {
        swaggerOptions: {
          validatorUrl: null,
          oauth2RedirectUrl: '/api-docs/oauth2-redirect.html'
        }
      })
    );
  
    // 7. Health Check
    app.get('/health', (req, res) => {
      res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
      });
    });
  
    // 8. Application Routes
    app.use('/api/todos', todoRouter);
  
    // 9. 404 Handler
    app.use((req: Request, res: Response) => {
      res.status(404).json({
        status: 'fail',
        message: `Not Found - ${req.originalUrl}`
      });
    });
  
    // 10. Global Error Handler
    app.use(errorHandler);
  
    return app;
  };