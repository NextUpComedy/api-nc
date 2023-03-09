import { Request } from 'express';
import { IDashboardSettings, IPayout } from 'nc-db-new';
import Big from 'big.js';
import { IEditDashboardSettings } from '../../interfaces/DtoAdmin';
import { IPagination } from '../../interfaces/DtoContents';
import { IUserId, IRejectUser } from '../../interfaces/DtoUsers';
import { IUser, IUserRequest } from '../../interfaces';
import { IUserExist } from '../../interfaces/DtoAuth';

export const paginationDTO = (request: Request): IPagination => (
  {
    page: Number(request.query.page),
    limit: Number(request.query.limit),
    title: typeof request.query.title === 'string' ? String(request.query.title) : undefined,
    id: typeof request.query.id === 'string' ? String(request.query.id) : undefined,
  });
export const userIdDTO = (request: Request): IRejectUser => (
  {
    userId: Number(request.params.userId),
    rejectionReason: request.body.rejectionReason,
  });

export const userDTO = (request: IUserRequest): IUserExist => (
  {
    user: request?.user as IUser,
    userId: request?.user?.id as number,
  });

export const userIdFromUserDTO = (user:IUser):IUserId => ({ userId: user.id as number });

export const payoutIdDTO = (request: IUserRequest):{payoutId:number, updatedBy:number} => ({
  payoutId: Number(request.params.payoutId),
  updatedBy: request?.user?.id as number,
});

export const payoutRejectionReasonDTO = (request: IUserRequest):{rejectionReason:string} => ({
  rejectionReason: request.body.rejectionReason,
});

export const payoutDTO = (payout:IPayout):{
  amount:Big,
  stripeAccount?:string,
  user:IUser
  userId:number
} => ({
  amount: new Big(payout.amount),
  stripeAccount: payout.user?.stripeAccount,
  user: payout.user as IUser,
  userId: payout.userId,
});

export const toAppSettingsDTO = (
  settings: IDashboardSettings,
): IEditDashboardSettings => ({
  calculatorEndpoint: settings.calculatorEndpoint,
  expiredAfterInYears: settings.expiredAfterInYears.toString(),
  uScreenWatchesFetchLimit: settings.limit.toString(),
  fetchMaxCount: settings.maxCount.toString(),
  uscreenApiKey: settings.uscreenApiKey,
  nextupToOwedSplitPercentage: settings.nextUpToOwedSplitPercentage,
  stripeKey: settings.stripeKey,
  systemActivationDate: settings.systemActivationDate,
  uScreenEndpoint: settings.uScreenEndpoint,
});

export const toDbSettingsDTO = (
  settings: IEditDashboardSettings,
): IDashboardSettings => ({
  calculatorEndpoint: settings.calculatorEndpoint,
  expiredAfterInYears: Number(settings.expiredAfterInYears),
  limit: Number(settings.uScreenWatchesFetchLimit),
  maxCount: Number(settings.fetchMaxCount),
  nextUpToOwedSplitPercentage: settings.nextupToOwedSplitPercentage,
  stripeKey: settings.stripeKey,
  uscreenApiKey: settings.uscreenApiKey,
  systemActivationDate: settings.systemActivationDate,
  uScreenEndpoint: settings.uScreenEndpoint,
});
