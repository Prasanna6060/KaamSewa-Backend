import express from 'express';
import {loginUser, registerUser} from '../controllers/auth.controller';
import { validateData } from '../middlewares/validate';
import { userLoginSchema } from '../schemas/userSchemas';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', validateData(userLoginSchema),loginUser);

export default router;