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
  createUserUderAgent,
  getNews,
  getComedianList,
  changeUserContentVatStatus,
} from '../../controllers';
import {
  constants,
  validator,
  changePasswordSchema,
  editProfileSchema,
  getUserPayoutsSchema,
  idSchema,
  userContentsSchema,
  createComedianSchema,
} from '../../helpers';
import { checkUserRole } from '../../middleware';

const router = Router();

const {
  ADMIN, MASTER_ADMIN, AGENT, COMEDIAN, ACCOUNTANT,
} = constants.userRoles;
router.use(checkUserRole([AGENT, ADMIN, MASTER_ADMIN, COMEDIAN, ACCOUNTANT]));

router.get('/get-news', getNews);
router.patch('/change-password', validator.body(changePasswordSchema), changePassword);
router.patch('/edit-profile', validator.body(editProfileSchema), editProfile);

router.use(checkUserRole([AGENT, ADMIN, MASTER_ADMIN]));
router.get('/current-watched-time/:contentId', getCurentWatchedTime);
router.get('/statistics/:userId', validator.params(idSchema), getSpecificUserStatistics);
router.get('/contents', validator.query(userContentsSchema), getUserContents);
router.get('/payouts', validator.query(getUserPayoutsSchema), getUserPayouts);
router.put('/payouts', askPayoutRequest);
router.patch('/payouts', cancelPayoutRequest);
router.patch('/payment-method', choosePaymentMethod);
router.get('/statistics', getUserStatistics);
router.get('/get-content-reports/:contentId', getContentReport);
router.get('/payment-details/:userId', getPaymentDetails);
router.post('/add-comedian', validator.body(createComedianSchema), createUserUderAgent);
router.get('/get-comedian-list', getComedianList);
router.patch('/change-user-content-vat-status', changeUserContentVatStatus);

router.use(checkUserRole([ADMIN, MASTER_ADMIN]));
router.get('/user-data/:userId', validator.params(idSchema), getUserDataByID);

export default router;
