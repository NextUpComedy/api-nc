import { Router } from 'express';

import {
  editProfile,
  changePassword,
  getUserStatistics,
  getUserDataByID,
  getUserPayouts,
  askPayoutRequest,
  cancelPayoutRequest,
  getSpecificUserStatistics,
  getUserContents,
} from '../../controllers';
import {
  constants,
  validator,
  changePasswordSchema,
  editProfileSchema,
  getUserPayoutsSchema,
  idSchema,
  userContentsSchema,
} from '../../helpers';
import { checkUserRole } from '../../middleware';

const router = Router();

const { ADMIN, MASTER_ADMIN, COMEDIAN } = constants.userRoles;

router.use(checkUserRole([COMEDIAN, ADMIN, MASTER_ADMIN]));

router.get('/statistics/:userId', validator.params(idSchema), getSpecificUserStatistics);
router.get('/contents', validator.query(userContentsSchema), getUserContents);

router.patch('/change-password', validator.body(changePasswordSchema), changePassword);
router.patch('/edit-profile', validator.body(editProfileSchema), editProfile);

router.get('/payouts', validator.query(getUserPayoutsSchema), getUserPayouts);
router.put('/payouts', askPayoutRequest);
router.patch('/payouts', cancelPayoutRequest);

router.get('/statistics', getUserStatistics);

router.use(checkUserRole([MASTER_ADMIN]));

router.get('/user-data/:userId', validator.params(idSchema), getUserDataByID);

export default router;
