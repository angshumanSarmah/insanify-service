import express from 'express';
import { loginWithGoogleToken } from '../controllers/loginController';

const router = express.Router();

router.post('/', loginWithGoogleToken);

export default router;
