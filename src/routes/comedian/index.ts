import { Router } from 'express';

import {
  getComedianContents, getComedianContentsReport, getCurentWatchedTime,
} from '../../controllers';
import {
  constants,
  validator,
  userContentsSchema,
} from '../../helpers';
import { checkUserRole } from '../../middleware';

const router = Router();

const {
  COMEDIAN,
} = constants.userRoles;

router.use(checkUserRole([COMEDIAN]));
router.get('/current-watched-time-comedian/:contentId', getCurentWatchedTime);
router.get('/get-comedian-content-reports/:contentId', getComedianContentsReport);

router.get('/get-comedian-contents', validator.query(userContentsSchema), getComedianContents);

export default router;
