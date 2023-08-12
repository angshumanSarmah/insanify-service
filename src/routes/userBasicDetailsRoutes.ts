import express from 'express';
import { createUserBasicDetails, getUserBasicDetails, updateUserBasicDetails } from '../controllers/userBasicDetailsController';
import { authenticateGoogleToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(authenticateGoogleToken); // Apply the middleware to all protected routes

router.post('/', createUserBasicDetails);
router.put('/', updateUserBasicDetails);
router.get('/', getUserBasicDetails);

export default router;
