import express from 'express';
import { createUserBasicDetails, getUserBasicDetails, updateUserBasicDetails } from '../controllers/userBasicDetailsController';

const router = express.Router();

router.post('/', createUserBasicDetails);
router.put('/', updateUserBasicDetails);
router.get('/', getUserBasicDetails);

export default router;
