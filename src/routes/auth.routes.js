import { Router } from 'express';

import * as authCtrl from '../controllers/auth.controller';
import { verifyUser } from '../middlewares';
const router = Router();

router.post('/signup', verifyUser.checkDuplicateEmail , authCtrl.signUp );
router.post('/signin', authCtrl.signIn );

export default router;