import express from 'express';
import { createUserProfileDetails, updateUserProfileDetails, getUserProfileDetails } from '../controllers/userProfileDetailsController';

const router = express.Router();

router.post('/', createUserProfileDetails);
router.put('/', updateUserProfileDetails);
router.get('/', getUserProfileDetails);

export default router;
