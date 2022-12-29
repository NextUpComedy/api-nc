import Big from 'big.js';
import { IPayout, IUser } from 'db-models-nc';
import { Transaction } from 'sequelize';

export interface IRejectUser {
userId: number
rejectionReason: string
}

export interface IUserDTO {
userId: number
}
export interface IResetPassword {
password: string
oldPassword: string
user: IUser
}

export interface IEditProfile {
  id: number
  name: string
  image: string
  videoNotification: boolean
  paymentNotification: boolean
  user: IUser
}

export type ISortOptions='ASC'|'DESC';
export interface IGetPaginatedPayouts {
    page:number;
    limit?:number;
    sort?:ISortOptions
    payoutStatusId?:number;
    userId?:number;
}

export interface IPayoutRequest {
  amount:Big,
  userId:number
  createdBy:number,
  updatedBy:number;
  payoutStatusId:number;
  }

export interface IUpdatePayoutRequestStatus{
    payoutRequest:IPayout;
    payoutStatusId:number;
    transaction?:Transaction;
    rejectionReason?:string;
    updatedBy:number
  }

export interface IUpdateUserPaidRevenue{
  paidRevenue:Big;
  userId: number;
  transaction?:Transaction;
}

export interface IUserId {
userId: number
}
