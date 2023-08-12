import express from 'express';
import { createUserProfileDetails, updateUserProfileDetails, getUserProfileDetails } from '../controllers/userProfileDetailsController';
import { authenticateGoogleToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(authenticateGoogleToken); // Apply the middleware to all protected routes

router.post('/', createUserProfileDetails);
router.put('/', updateUserProfileDetails);
router.get('/', getUserProfileDetails);

export default router;
