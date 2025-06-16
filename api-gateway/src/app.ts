
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';


import { config } from './config';
import logger from './config/logger';
import { proxyServices } from './config/services';
import { validateJWT } from './middlewares/validateJWT';



const app = express();
app.use((req, res, next) => {
  const shouldSkip = req.path.startsWith('/auth/') || req.path.startsWith('/ai/') || req.path.startsWith('/progress/');
  if (shouldSkip) return next(); // Skip express.json

  express.json()(req, res, next); // Apply parser hanya untuk route lain
});
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());

// Request logging
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.debug(`${req.method} ${req.url}`);
  next();
});



app.use(validateJWT);
// Service routes
// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  // const requestBody = req.body; // Mengakses body dari request
  res.status(200).json({ status: 'ok', auth:config.AUTH_SERVICE_URL,
    progress: config.PROGRESS_SERVICE_URL,
    ai: config.AI_SERVICE_URL,
    
   });
});

proxyServices(app);



// 404 handler
app.use((req: Request, res: Response) => {
  logger.warn(`Resource not found: ${req.method} ${req.url}`);
  res.status(404).json({ message: 'resource not found' });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// Start server
const startServer = () => {
  try {
    app.listen(config.PORT, () => {
      logger.info(`${config.SERVICE_NAME} running on port ${config.PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
