import {
  isAfter, differenceInMinutes, addMinutes, differenceInDays,
} from 'date-fns';
import {
  getDashboardSettings,
  Report,
} from 'db-models-nc';
import { NextFunction, Response } from 'express';
import axios from 'axios';
import { IEditDashboardSettings } from '../../interfaces/DtoAdmin';
import { httpStatus, messages } from '../../helpers/constants';
import { dto, errorMessages } from '../../helpers';
import { IUserRequest } from '../../interfaces';

export default async (request: IUserRequest, response: Response, next: NextFunction)
:Promise<void> => {
  const {
    watchTimeTo,
    totalRevenue,
    createdBy,
    updatedBy,
  } = dto.adminDTO.setReportDTO(request);
  const { calculatorEndpoint } = request.app.get('settings') as IEditDashboardSettings;
  const now = new Date();

  try {
    if (isAfter(new Date(watchTimeTo), now)) throw errorMessages.INVALID_DATE_PROCESS;
    const [lastReport, { nextUpToOwedSplitPercentage, systemActivationDate }] = await Promise.all([
      Report.findOne({ order: [['id', 'DESC']] }),
      getDashboardSettings(),
    ]);
    const watchTimeFrom = (lastReport?.watchTimeTo || systemActivationDate);
    if (!lastReport || (lastReport.totalRevenue && lastReport.overallWatchedSeconds)) {
      if (differenceInDays(new Date(watchTimeTo), new Date(watchTimeFrom)) < 1) {
        throw errorMessages.INVALID_REPORT_DURATION;
      }
      await Report.create({
        watchTimeFrom,
        nextUpToOwedSplitPercentage,
        watchTimeTo,
        createdBy,
        updatedBy,
        totalRevenue,
      });
      axios.get(calculatorEndpoint).catch(() => {
        /* */
      });
      response
        .status(httpStatus.CREATED)
        .json({ message: messages.responses.SUCCESS_REPORT_CREATION });
      return;
    }
    if (!lastReport.updatedAt) return;
    const lastUpdateDate = new Date(lastReport.updatedAt);
    const dateAfter16minsFromLastUpdate = addMinutes(lastUpdateDate, 2 || 16);
    const durationSinceLastUpdateInMins = differenceInMinutes(dateAfter16minsFromLastUpdate, now);
    if (durationSinceLastUpdateInMins > 0) {
      response
        .status(httpStatus.OK)
        .json({
          message: messages.responses
            .PENDING_CALCULATION_PROCCESS(durationSinceLastUpdateInMins),
        });
      return;
    }
    lastReport.changed('updatedAt', true);
    await lastReport.save();
    // call
    axios.get(calculatorEndpoint).catch(() => {
      /* */
    });

    response
      .status(httpStatus.OK)
      .json({
        message: messages.responses
          .SUCCESS_RESTART_OF_CALCULATION_PROCCESS,
        data: lastReport,
      });
  } catch (error) {
    next(error);
  }
};
