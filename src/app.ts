//*****************************************MiGHT need to use connection Pool check this********************************************************** */

import express, { Application, Request, Response, NextFunction } from 'express';
import socialMediaRoutes from './routes/socialMediaRoutes'; // Import the new route
import userBasicDetailsRoutes from './routes/userBasicDetailsRoutes'; // Import the new route
import userProfileDetailsRoutes from './routes/userProfileDetailsRoutes'; // Import the new route


const app: Application = express();

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Middleware to parse JSON requests
app.use(express.json());

// Use the social media routes
app.use('/api/social-media', socialMediaRoutes);
app.use('/api/user-basic-details', userBasicDetailsRoutes);
app.use('/api/user-profile-details', userProfileDetailsRoutes);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});
