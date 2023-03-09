import { IUser } from 'nc-db-new';

export interface IEditDashboardSettings {
  nextupToOwedSplitPercentage: string
  fetchMaxCount: string
  expiredAfterInYears: string
  uScreenWatchesFetchLimit: string
  stripeKey: string;
  uscreenApiKey: string;
  uScreenEndpoint: string;
  systemActivationDate: string;
  calculatorEndpoint: string;
}

export interface IAddUser {
  name: string
  email: string
  roleId: number
  currentUser?: IUser
}

export interface IStatisticsPayload {
  fromDate: string;
  toDate: string;
  page: number;
  limit: number;
}

export interface IUserContentsPayload {
  userId: number;
  page: number;
  limit: number;
}

export interface ISetStripeAccount {
  userId: number;
  stripeAccount: string;
  updatedBy: number
}

export interface ISetReport {
  watchTimeTo: string,
  totalRevenue: number,
  createdBy: number,
  updatedBy:number,
}
