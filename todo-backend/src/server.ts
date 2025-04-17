// backend/src/server.ts
import { AppDataSource } from './data-source'
import { createApp } from './app';

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected');

    const app = createApp();
    const port = process.env.PORT || 3000;
    
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();