import { IContent, IPayout, IUser } from 'db-models-nc';
import {
  IGetPaginatedPayouts, IPayoutRequest, IUpdatePayoutRequestStatus, IUpdateUserPaidRevenue, IUserId,
} from '../../interfaces/DtoUsers';
import { IPagination, IMatchUserContent } from '../../interfaces/DtoContents';
import {
  ICustomContent, ICustomUser, IAddUser,
} from '../../interfaces';

type IGetPaginatedContentsDTO = (_: IPagination) => Promise<
  { rows: ICustomContent[]; count: number; } | ICustomContent[] | ICustomContent | null
>

type IGetContentReportDTO = (_: {
  page: number;
  limit: number;
  userId: number;
}) => Promise<{ rows: ICustomContent[]; count: number }>;

type IGetPaginatedUsersDTO = (_: IPagination) => Promise<
  { rows: ICustomUser[]; count: number; } | ICustomUser[]
>

export type IMatchUserContentDTO = (_: IMatchUserContent) => Promise<IContent>

export type GetUserByEmailDTO = (email: string) => Promise<IUser | null>

export type GetUserByIdDTO = (id: number) => Promise<IUser | null>

export type AddUserDTO = (data: IAddUser) => Promise<IUser>

export type GetUsersStatusDTO = (statusId: number, _: {
  page: number, limit: number
}) => Promise<{rows: IUser[], count: number} | IUser[]>

type IGetPaginatedPayoutsDTO=(_:IGetPaginatedPayouts)=>Promise<{ rows: IPayout[]; count: number; }>

type IAskForPayoutDTO=(_:IPayoutRequest)=>Promise<IPayout>

type IGetPendingPayoutRequestDTO=(_:IUserId)=>Promise<IPayout|null>

type IUpdatePayoutRequestStatusDTO=(_:IUpdatePayoutRequestStatus)=>Promise<IPayout>

type IGetPayoutByIdDTO = (_: number) => Promise<IPayout | null>

type IUpdateUserPaidRevenueDTO =(_:IUpdateUserPaidRevenue)=>Promise<void>

export {
  IGetPaginatedContentsDTO,
  IGetContentReportDTO,
  IGetPaginatedUsersDTO,
  IGetPaginatedPayoutsDTO,
  IAskForPayoutDTO,
  IGetPendingPayoutRequestDTO,
  IUpdatePayoutRequestStatusDTO,
  IGetPayoutByIdDTO,
  IUpdateUserPaidRevenueDTO,
};
