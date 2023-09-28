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
  choosePaymentMethod,
  getCurentWatchedTime,
  getContentReport,
  getPaymentDetails,
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

const { ADMIN, MASTER_ADMIN, AGENT } = constants.userRoles;

router.use(checkUserRole([AGENT, ADMIN, MASTER_ADMIN]));
router.get('/current-watched-time/:contentId', getCurentWatchedTime);

router.get('/statistics/:userId', validator.params(idSchema), getSpecificUserStatistics);
router.get('/contents', validator.query(userContentsSchema), getUserContents);

router.patch('/change-password', validator.body(changePasswordSchema), changePassword);
router.patch('/edit-profile', validator.body(editProfileSchema), editProfile);

router.get('/payouts', validator.query(getUserPayoutsSchema), getUserPayouts);
router.put('/payouts', askPayoutRequest);
router.patch('/payouts', cancelPayoutRequest);
router.patch('/payment-method', choosePaymentMethod);

router.get('/statistics', getUserStatistics);
router.get('/get-content-reports/:contentId', getContentReport);
router.get('/payment-details/:userId', getPaymentDetails);

router.use(checkUserRole([MASTER_ADMIN]));
router.get('/user-data/:userId', validator.params(idSchema), getUserDataByID);

export default router;
