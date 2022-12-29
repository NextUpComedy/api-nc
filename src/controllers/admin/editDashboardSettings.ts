import { Request, Response, NextFunction } from 'express';
import { editDashboardSettings } from '../../services';
import { constants, dto } from '../../helpers';

export default async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const {
    viewliftPassword,
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
        viewliftPassword,
        stripeKey,
      },
      regularVariables,
    });
    request.app.set('settings', {
      viewliftPassword,
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
