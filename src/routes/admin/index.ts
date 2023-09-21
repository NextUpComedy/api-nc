import { Router } from 'express';

import {
  approveUser,
  pendingUsers,
  approvedUser,
  bannedUsers,
  rejectedUsers,
  rejectUser,
  blockUser,
  banUser,
  editDashboardSettings,
  getDashboardSettings,
  createUser,
  getPaginatedUsers,
  editProfile,
  approvePayout,
  rejectPayout,
  getPayouts,
  getUserDataByID,
  getAdminStatistics,
  putPlans,
  getPlans,
  deletePlan,
  setStripeAccount,
  setReport,
  editContentData,
} from '../../controllers';
import {
  constants,
  validator,
  idSchema,
  getPaginatedDataSchema,
  createUserSchema,
  editSystemSettingsSchema,
  editProfileSchema,
  payoutIdSchema,
  payoutRejectionReasonSchema,
  getPayoutsAdminSchema,
  getAdminStatisticsSchema,
  putPlanSchema,
  planIdSchema,
  setStripeAccountSchema,
  setReportSchema,
  editContentDataSchema,
} from '../../helpers';
import { checkUserRole } from '../../middleware';

const router = Router();

const { ADMIN, MASTER_ADMIN } = constants.userRoles;

router.use(checkUserRole([ADMIN, MASTER_ADMIN]));

router.get('/approved-list', validator.query(getPaginatedDataSchema), approvedUser);
router.get('/rejected-list', validator.query(getPaginatedDataSchema), rejectedUsers);
router.get('/waiting-list', validator.query(getPaginatedDataSchema), pendingUsers);
router.get('/banned-list', validator.query(getPaginatedDataSchema), bannedUsers);

router.get('/users', validator.body(getPaginatedDataSchema), getPaginatedUsers);
router.get('/user-data/:userId', validator.params(idSchema), getUserDataByID);
router.get('/statistics', validator.query(getAdminStatisticsSchema), getAdminStatistics);

router.post('/add-user', validator.body(createUserSchema), createUser);

router.patch('/edit-user-profile', validator.body(editProfileSchema), editProfile);
router.patch('/reject/:userId', validator.params(idSchema), rejectUser);
router.patch('/approve/:userId', validator.params(idSchema), approveUser);
router.patch('/ban/:userId', validator.params(idSchema), banUser);

router.put('/set-user-stripe-account', validator.body(setStripeAccountSchema), setStripeAccount);

router.get('/payouts', validator.query(getPayoutsAdminSchema), getPayouts);
router.patch('/payouts/:payoutId/approve', validator.params(payoutIdSchema), approvePayout);
router.patch('/payouts/:payoutId/reject', validator.params(payoutIdSchema), validator.body(payoutRejectionReasonSchema), rejectPayout);

router.put('/report', validator.body(setReportSchema), setReport);
router.patch('/edit-content-data', validator.body(editContentDataSchema), editContentData);

router.use(checkUserRole([MASTER_ADMIN]));
router.get('/dashboard-settings', getDashboardSettings);
router.patch('/edit-dashboard-settings', validator.body(editSystemSettingsSchema), editDashboardSettings);
router.patch('/block-user/:userId', validator.params(idSchema), blockUser);
router.get('/plans', getPlans);
router.put('/plans', validator.body(putPlanSchema), putPlans);
router.delete('/plans/:planId', validator.params(planIdSchema), deletePlan);

export default router;
