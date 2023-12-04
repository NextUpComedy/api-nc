import Big from 'big.js';
import { IPayout, IUser } from 'nc-db-new';
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
export interface IAddComedian {
  name: string
  email: string
  currentUser?: IUser
  type: number
}

export interface IEditProfile {
  id: number
  name: string
  image: string
  videoNotification: boolean
  paymentNotification: boolean
  user: IUser
  password: string
}

export type ISortOptions='ASC'|'DESC';
export interface IGetPaginatedPayouts {
    page:number;
    limit?:number;
    sort?:ISortOptions
    payoutStatusId?:number;
    userId?:number;
}
export interface IGetPaginatedAccountantPayout {
  page:number;
  limit?:number;
  sort?:ISortOptions
  payoutStatusId?:number;
  userId?:number;
  linkedAgentId?:number;
}

export interface IAccountantContentsPayload {
  linkedAgentId: number;
  page: number;
  limit: number;
}
export interface IPayoutRequest {
  amount:Big,
  userId:number
  createdBy:number,
  updatedBy:number;
  payoutStatusId:number;
  }
export interface IAccountantPayoutRequest {
    userId:number
    createdBy:number,
    updatedBy:number;
    payoutStatusId:number;
    linkedAgentId:number;
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
