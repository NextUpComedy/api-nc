import Big from 'big.js';
import { Request } from 'express';
import {
  IResetPassword,
  IEditProfile,
  IGetPaginatedPayouts,
  IPayoutRequest,
  ISortOptions,
  IAddComedian,
} from '../../interfaces/DtoUsers';
import { IUserRequest, IPayoutStatuses, IUser } from '../../interfaces';
import { constants } from '..';

export const resetPasswordDTO = (request: IUserRequest): IResetPassword => ({
  ...request.body,
  user: request.user,
});

export const editProfileDTO = (request: IUserRequest): IEditProfile => ({
  ...request.body,
  user: request.user,
  password: request.body.password,
});

export const getPayoutsByUserIdDTO = (
  request: IUserRequest,
): IGetPaginatedPayouts => ({
  page: (request.query.page as number | undefined) || 1,
  limit: request.query.limit as number | undefined,
  payoutStatusId:
    constants.payoutStatuesIds[
      (request.query.status as string)?.toUpperCase() as IPayoutStatuses
    ],
  sort: request.query.sort as ISortOptions,
  userId: (request.user as IUser).id as number,
});

export const askForPayoutDTO = (request: IUserRequest): IPayoutRequest => ({
  amount: new Big(request?.user?.totalRevenue || 0).minus(
    request?.user?.paidRevenue || 0,
  ),
  userId: request?.user?.id as number,
  createdBy: request?.user?.id as number,
  updatedBy: request?.user?.id as number,
  payoutStatusId: constants.payoutStatuesIds.PENDING,
});
export const addComedianDTO = (
  request: IUserRequest,
): IAddComedian => ({
  name: request.body.name,
  email: request.body.email.toLowerCase(),
  currentUser: request.user,
});
export const getCurentWatchedTimeDTO = (request: Request): any => request.body;
export const UploadContentDTO = ({ body }: Request):
  { userId: number; type: string; link: string; text: string;
    createdBy: number; updatedBy: number } => (
  {
    userId: body.userId,
    type: body.type,
    link: body.link,
    text: body.text,
    createdBy: body.createdBy,
    updatedBy: body.updatedBy,
  }
);
