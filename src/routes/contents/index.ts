import { Router } from 'express';

import {
  getUnMatchContent,
  matchUserContent,
  changeContentOwner,
  getMatchedContents,
  addOtherRevenue,
} from '../../controllers';
import {
  constants,
  validator,
  getPaginatedDataSchema,
  matchUserContentSchema,
  changeOwnerSchema,
} from '../../helpers';
import { checkUserRole } from '../../middleware';

const router = Router();

const { ADMIN, MASTER_ADMIN } = constants.userRoles;

router.use(checkUserRole([ADMIN, MASTER_ADMIN]));

router.get('/', validator.query(getPaginatedDataSchema), getUnMatchContent);
router.get('/get-matched-content', validator.query(getPaginatedDataSchema), getMatchedContents);
router.patch('/match-user-content', validator.body(matchUserContentSchema), matchUserContent);
router.patch('/change-content-owner', validator.body(changeOwnerSchema), changeContentOwner);
router.patch('/add-other-revenue', addOtherRevenue);

export default router;
