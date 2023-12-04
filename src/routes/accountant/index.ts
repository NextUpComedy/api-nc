import { Router } from 'express';

import {
  accountantPayout,
  cancelAccountantPayout,
  getAccountantContent,
  getAccountantPayouts,
} from '../../controllers';
import {
  constants,
  validator,
  getUserPayoutsSchema,
} from '../../helpers';
import { checkUserRole } from '../../middleware';

const router = Router();

const {
  ACCOUNTANT,
} = constants.userRoles;

router.use(checkUserRole([ACCOUNTANT]));
router.get('/contents', getAccountantContent);
router.get('/payouts', validator.query(getUserPayoutsSchema), getAccountantPayouts);
router.put('/payouts', accountantPayout);
router.patch('/payouts', cancelAccountantPayout);

export default router;
