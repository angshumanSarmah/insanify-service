//*****************************************MiGHT need to use connection Pool check this********************************************************** */

import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import socialMediaRoutes from './routes/socialMediaRoutes';
import userBasicDetailsRoutes from './routes/userBasicDetailsRoutes';
import userProfileDetailsRoutes from './routes/userProfileDetailsRoutes';
import authRoutes from './routes/authRoutes';

// import passportSetup from './passport';


if(process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

dotenv.config();

const app: Application = express();

app.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET, POST, PUT, DELETE',
  credentials: true
}));


const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


// Middleware to parse JSON requests
app.use(express.json());

app.use('/api/login', authRoutes);
// Use the social media routes
app.use('/api/social-media', socialMediaRoutes);
app.use('/api/user-basic-details', userBasicDetailsRoutes);
app.use('/api/user-profile-details', userProfileDetailsRoutes);

// Error handling middleware
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong!', error: err });
// });
