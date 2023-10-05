import { Request } from 'express';
import { IGetPaginatedPayouts, ISortOptions } from '../../interfaces/DtoUsers';
import {
  IEditDashboardSettings,
  IAddUser,
  IStatisticsPayload,
  IUserContentsPayload,
  ISetStripeAccount,
  ISetReport,
} from '../../interfaces/DtoAdmin';
import { IPayoutStatuses, IUserRequest } from '../../interfaces';
import { constants } from '..';

export const editDashboardSettingsDTO = (request: Request): IEditDashboardSettings => ({
  nextupToOwedSplitPercentage: request.body.nextupToOwedSplitPercentage.toString(),
  fetchMaxCount: request.body.fetchMaxCount.toString(),
  expiredAfterInYears: request.body.expiredAfterInYears.toString(),
  uScreenWatchesFetchLimit: request.body.uScreenWatchesFetchLimit.toString(),
  stripeKey: request.body.stripeKey.toString(),
  uscreenApiKey: request.body.uscreenApiKey.toString(),
  uScreenEndpoint: request.body.uScreenEndpoint.toString(),
  systemActivationDate: request.body.systemActivationDate.toString(),
  calculatorEndpoint: request.body.calculatorEndpoint.toString(),
});

export const addUserDTO = (request: IUserRequest): IAddUser => (
  {
    name: request.body.name,
    email: request.body.email.toLowerCase(),
    roleId: request.body.roleId,
    currentUser: request.user,
  });

export const getPayoutsAdminDTO = (request:Request):IGetPaginatedPayouts => ({
  page: request.query.page as number|undefined || 1,
  limit: request.query.limit as number|undefined,
  payoutStatusId: constants
    .payoutStatuesIds[(request.query.status as string)?.toUpperCase() as IPayoutStatuses],
  sort: request.query.sort as ISortOptions,
  userId: request.query.userId as number | undefined,
});
export const statisticsDTO = (request: Request): IStatisticsPayload => ({
  fromDate: request.query.fromDate as string,
  toDate: request.query.toDate as string,
  page: Number(request.query.page || 1),
  limit: Number(request.query.limit || 10),
});

export const userContentsDTO = (request: IUserRequest): IUserContentsPayload => ({
  page: Number(request.query.page || 1),
  limit: Number(request.query.limit || 10),
  userId: request.user?.id as number,
});

export const plansDTO = (request: Request): { [key: string]: number } => request.body;

export const deletePlanDTO = (request: Request): string => request.params.planId;

export const setStripeAccountDTO = (request: IUserRequest): ISetStripeAccount => ({
  userId: request.body.userId as number,
  stripeAccount: request.body.stripeAccount as string,
  updatedBy: request?.user?.id as number,
});

export const setReportDTO = (request: IUserRequest): ISetReport => ({
  watchTimeTo: request.body.watchTimeTo,
  totalRevenue: request.body.totalRevenue,
  createdBy: request?.user?.id as number,
  updatedBy: request?.user?.id as number,
});

export const addNewsDTO = ({ body }: Request):
  { userId: number; title: string; newsContent: string; publishDate: string;
     image: string; link: string; createdBy: number; updatedBy: number } => (
  {
    userId: body.userId,
    title: body.title,
    newsContent: body.newsContent,
    publishDate: body.publishDate,
    image: body.image,
    link: body.link,
    createdBy: body.createdBy,
    updatedBy: body.updatedBy,
  }
);
