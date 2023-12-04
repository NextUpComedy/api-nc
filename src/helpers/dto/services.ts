import {
  IContent,
  IPayout,
  IUser,
  INews,
  IUserServices,
  IContentReport,
} from 'nc-db-new';
import {
  IGetPaginatedPayouts,
  IPayoutRequest,
  IUpdatePayoutRequestStatus,
  IUpdateUserPaidRevenue,
  IUserId,
  IGetPaginatedAccountantPayout,
} from '../../interfaces/DtoUsers';
import { IPagination, IMatchUserContent } from '../../interfaces/DtoContents';
import {
  ICustomContent,
  ICustomUser,
  IAddUser,
  ICustomContentReport,
  IAddNews,
  IUpoloadContent,
  IAddContent,
  IAddContentReport,
} from '../../interfaces';

type IGetPaginatedContentsDTO = (
  _: IPagination
) => Promise<
  | { rows: ICustomContent[]; count: number }
  | ICustomContent[]
  | ICustomContent
  | null
>;

type IGetContentReportDTO = (_: {
  page: number;
  limit: number;
  userId: number;
}) => Promise<{ rows: ICustomContent[]; count: number }>;

type IGetComedianListDTO = (_: IUserId) => Promise<IUser | null>;

type IGetContentReportByIdDTO = (_: {
  contentId: number;
}) => Promise<{ rows: ICustomContentReport[]; count: number }>;

type IGetPaginatedUsersDTO = (
  _: IPagination
) => Promise<{ rows: ICustomUser[]; count: number } | ICustomUser[]>;

export type IMatchUserContentDTO = (_: IMatchUserContent) => Promise<IContent>;

export type GetUserByEmailDTO = (email: string) => Promise<IUser | null>;

export type GetUserByIdDTO = (id: number) => Promise<IUser | null>;

export type AddUserDTO = (data: IAddUser) => Promise<IUser>;

export type AddContentDTO = (data: IAddContent) => Promise<IContent>;

export type AddContentReportDTO = (
  data: IAddContentReport
) => Promise<IContentReport>;

export type AddNewsDto = (data: IAddNews) => Promise<INews>;
export type IUploadContentDTO = (
  data: IUpoloadContent
) => Promise<IUserServices>;

export type GetUsersStatusDTO = (
  statusId: number,
  _: {
    page: number;
    limit: number;
  }
) => Promise<{ rows: IUser[]; count: number } | IUser[]>;

type IGetPaginatedPayoutsDTO = (
  _: IGetPaginatedPayouts
) => Promise<{ rows: IPayout[]; count: number }>;

type IGetPaginatedAccountantPayoutsDTO = (
  _: IGetPaginatedAccountantPayout
) => Promise<{ rows: IPayout[]; count: number }>;

type IAskForPayoutDTO = (_: IPayoutRequest) => Promise<IPayout>;

type IGetPendingPayoutRequestDTO = (_: IUserId) => Promise<IPayout | null>;

type IUpdatePayoutRequestStatusDTO = (
  _: IUpdatePayoutRequestStatus
) => Promise<IPayout>;

type IGetPayoutByIdDTO = (_: number) => Promise<IPayout | null>;

type IUpdateUserPaidRevenueDTO = (_: IUpdateUserPaidRevenue) => Promise<void>;

type IGetPaginatedUserContentsDTO = (
  { userId, page, limit }: { userId: number; page: number; limit: number }
) => Promise<{ rows: IContent[]; count: number }>;

type IGetAccountantContentsDTO = (
  { linkedAgentId, page, limit }: { linkedAgentId: number; page: number; limit: number }
) => Promise<{ rows: IContent[]; count: number }>;

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
  IGetContentReportByIdDTO,
  IGetComedianListDTO,
  IGetPaginatedAccountantPayoutsDTO,
  IGetPaginatedUserContentsDTO,
  IGetAccountantContentsDTO,
};
