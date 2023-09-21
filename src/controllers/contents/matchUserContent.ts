import { Request, Response, NextFunction } from 'express';
import { IEditDashboardSettings } from '../../interfaces/DtoAdmin';
import { matchUserContent } from '../../services';
import {
  constants, dto, errorMessages,
} from '../../helpers';

export default async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const {
    advance, feePaid, filmingCosts, id, launchDate, recoveredCosts, userId,
  } = dto.contentDTO.matchUserContentDTO(request);
  const totalCost = +filmingCosts + +advance + +feePaid;
  const appSettings = request.app.get('settings') as IEditDashboardSettings;
  const {
    nextUpToOwedSplitPercentage,
    expiredAfterInYears,
  } = dto.generalDTO.toDbSettingsDTO(appSettings);

  try {
    if (+recoveredCosts > totalCost) throw errorMessages.RECOVERED_GREATER_COST_ERROR;

    const content = await matchUserContent({
      advance,
      feePaid,
      filmingCosts,
      id,
      launchDate,
      recoveredCosts,
      userId,
      nextUpToOwedSplitPercentage,
      expiredAfterInYears,
      otherRevenue: request.body.otherRevenue,
    });

    response
      .json({ message: constants.messages.authResponse.MATCH_SUCCESSFULLY, data: content });
  } catch (error) {
    next(error);
  }
};
