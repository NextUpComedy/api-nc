import { Router } from 'express';
import { checkUserRole } from '../../middleware';

import {
  signupHandler, loginHandler, userAuth, forgetPassword,
  logInGoogle, resetPassword, logOut, signUpGoogle, resetPasswordEmail,
} from '../../controllers';

import {
  constants, validator, loginSchema, signupSchema, emailSchema, passwordSchema,
} from '../../helpers';

const {
  ADMIN, MASTER_ADMIN, AGENT, COMEDIAN, ACCOUNTANT,
} = constants.userRoles;

const router = Router();

router.post('/login', validator.body(loginSchema), loginHandler);
router.post('/signup', validator.body(signupSchema), signupHandler);

router.post('/log/google', logInGoogle);
router.post('/sign/google', signUpGoogle);

router.post('/forget-password', validator.body(emailSchema), forgetPassword);
router.post('/reset-password', validator.body(passwordSchema), resetPassword);
router.get('/reset-password/:token', resetPasswordEmail);

router.use(checkUserRole([ADMIN, MASTER_ADMIN, AGENT, COMEDIAN, ACCOUNTANT]));

router.get('/user', userAuth);
router.get('/logout', logOut);

export default router;
