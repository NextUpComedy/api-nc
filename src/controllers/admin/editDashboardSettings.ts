import { Request, Response, NextFunction } from 'express';
import { editDashboardSettings } from '../../services';
import { constants, dto } from '../../helpers';

export default async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const {
    uscreenApiKey,
    stripeKey,
    ...regularVariables
  } = dto.adminDTO.editDashboardSettingsDTO(request);

  const { httpStatus, messages } = constants;

  try {
    const {
      regularVariables: newRegularVariables,
      encryptedVariables,
    } = await editDashboardSettings({
      encryptedVariables: {
        uscreenApiKey,
        stripeKey,
      },
      regularVariables,
    });
    request.app.set('settings', {
      uscreenApiKey,
      stripeKey,
      ...regularVariables,
    });

    response
      .status(httpStatus.OK)
      .json({
        message: messages.authResponse.DASHBOARD_VARS_CHANGED,
        data: { ...newRegularVariables, ...encryptedVariables },
      });
  } catch (error) {
    next(error);
  }
};
