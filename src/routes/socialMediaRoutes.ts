import express, { Router } from 'express';
import { createSocialMediaDetail, deleteSocialMediaDetail, getSocialMediaDetail } from '../controllers/socialMediaController'; // Import the controller function
import { authenticateGoogleToken } from '../middlewares/authMiddleware';

const router: Router = express.Router();

router.use(authenticateGoogleToken); // Apply the middleware to all protected routes

//social media details API
router.post('/', createSocialMediaDetail);
router.get('/', getSocialMediaDetail);
router.delete('/', deleteSocialMediaDetail);

export default router;
