import { Router } from 'express';

import {
  getUnMatchContent,
  matchUserContent,
  changeContentOwner,
  getMatchedContents,
  addOtherRevenue,
  addComedianContent,
  getComedianContents,
} from '../../controllers';
import {
  constants,
  validator,
  getPaginatedDataSchema,
  matchUserContentSchema,
  changeOwnerSchema,
  addComedianContentSchema,
  userContentsSchema,
} from '../../helpers';
import { checkUserRole } from '../../middleware';

const router = Router();

const {
  ADMIN, MASTER_ADMIN, AGENT, COMEDIAN,
} = constants.userRoles;
router.use(checkUserRole([AGENT, ADMIN, MASTER_ADMIN, COMEDIAN]));
router.get('/get-comedian-contents', validator.query(userContentsSchema), getComedianContents);

router.use(checkUserRole([AGENT, ADMIN, MASTER_ADMIN]));
router.post('/add-comedian-content', validator.body(addComedianContentSchema), addComedianContent);

router.use(checkUserRole([ADMIN, MASTER_ADMIN]));

router.get('/', validator.query(getPaginatedDataSchema), getUnMatchContent);
router.get('/get-matched-content', validator.query(getPaginatedDataSchema), getMatchedContents);
router.patch('/match-user-content', validator.body(matchUserContentSchema), matchUserContent);
router.patch('/change-content-owner', validator.body(changeOwnerSchema), changeContentOwner);
router.patch('/add-other-revenue', addOtherRevenue);

export default router;
