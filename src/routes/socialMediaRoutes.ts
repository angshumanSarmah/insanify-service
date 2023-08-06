import express, { Router } from 'express';
import { createSocialMediaDetail, deleteSocialMediaDetail, getSocialMediaDetail } from '../controllers/socialMediaController'; // Import the controller function

const router: Router = express.Router();

//social media details API
router.post('/', createSocialMediaDetail);
router.get('/', getSocialMediaDetail);
router.delete('/', deleteSocialMediaDetail);

export default router;
