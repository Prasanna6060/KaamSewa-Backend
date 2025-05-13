import express from 'express';
import {loginUser, registerUser} from '../controllers/auth.controller';
import { validateData } from '../middlewares/validate';
import { userLoginSchema, userRegisterSchema } from '../schemas/userSchemas';

const router = express.Router();

router.post('/register',validateData(userRegisterSchema), registerUser);
router.post('/login', validateData(userLoginSchema),loginUser);

export default router;