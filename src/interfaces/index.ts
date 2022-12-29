import { IUser, IContent } from 'db-models-nc';
import {
  Secret,
} from 'jsonwebtoken';
import { Request } from 'express';

interface IServerAddress{
  port: number;
  address: string;
}

interface IUserInfo{
  id: number;
  roleId: number;
  email: string;
  name: string;
  image?: string;
  role?: string;
}

interface IServer{
  SECRET_KEY: Secret;
  APP_MAIL: string;
  MAIL_PASSWORD: string;
  PORT: string;
  CLIENT_URL: string;
  SERVER_URL: string;
  CLIENT_ID: string;
  GOOGLE_API: string;
  AWS_BUCKET_NAME: string;
  AWS_BUCKET_REGION: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  ENCRYPTION_SECRET_KEY: string;
}
interface IDatabase{
url:string
}
interface GoogleUserRequest extends Request {
  googleUserData: { sub: string,
    email: string,
    name: string,
    image: string, },
}

interface ApprovedUser {
  id: number,
  email: string,
  roleId: number,
  name: string,
}

interface FinancialInformation {
  id?: number,
  userId: number,
  name: string,
  address: string,
  createdBy?: number,
  updatedBy?: number,
}

interface ErrorWithDetails extends Error {
  details: [
    {
      message: string
    }
  ];
 }

interface IContents {
  id: string;
  userId: number;
  runtime: number;
  title: string;
  publishDate: string;
  permalink: string;
  advance?: number;
  launchDate?: string;
  nextUpAccRevenue: string;
  owedAccRevenue: string;
  freeToBePaid?: number
  feePaid?: number;
  filmingCosts?: number;
  paidToOwedAmount?: number;
  createdBy: number;
  updatedBy: number;
  primaryCategory: string;
  createdAt: string;
  updatedAt: string;
}

interface IUsers {
  id: number;
  name: string;
  email: string;
  image: string;
}

interface IStatistics {
  counts: {
    allUsers: number,
    pendingUsers: number,
    approvedUsers: number,
    rejectedUsers: number,
    bannedUsers: number,
    contents: number,
    payouts: number
  },
  revenues: {
    paid: {
      allUsers: number,
      pendingUsers: number,
      approvedUsers: number,
      rejectedUsers: number,
      bannedUsers: number
    },
    total: {
      earnings: number,
      allUsers: number,
      pendingUsers: number,
      approvedUsers: number,
      rejectedUsers: number,
      bannedUsers: number
    }
  }
}

interface IReports {
  count: number;
  rows: {
    watchTimeFrom: string;
    watchTimeTo: string;
    overallWatchedSeconds: string;
    totalRevenue: string;
  }
}

type ICustomContent = Omit<IContent, 'deletedAt'>
type ICustomUser = Pick<IUser, 'id' | 'name' | 'email' | 'image'>

interface IAddUser{
    name: string;
    email: string;
    password: string;
    userRoleId: number;
    createdBy: number;
    updatedBy: number;
    image?: string;
    googleId?: string;
    userStatusId?: number;
    totalRevenue: number;
    paidRevenue: number;
}

interface IGoogleAuthentication{
  googleId: string,
  email:string
  name: string,
  image: string,
}

interface IUserRequest extends Request {
  user?: IUser,
}
export type IPayoutStatuses='PENDING'|'APPROVED'|'REJECTED'|'CANCELLED';

export {
  IUserRequest,
  IGoogleAuthentication,
  IServerAddress,
  IUserInfo,
  IServer,
  IDatabase,
  ApprovedUser,
  GoogleUserRequest,
  IUser,
  ErrorWithDetails,
  FinancialInformation,
  IContents,
  IUsers,
  ICustomUser,
  ICustomContent,
  IAddUser,
  IStatistics,
  IReports,
};
