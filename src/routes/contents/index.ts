import { Router } from 'express';

import {
  getUnMatchContent,
  matchUserContent,
  changeContentOwner,
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
router.patch('/match-user-content', validator.body(matchUserContentSchema), matchUserContent);
router.patch('/change-content-owner', validator.body(changeOwnerSchema), changeContentOwner);

export default router;
