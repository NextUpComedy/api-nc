import { Request } from 'express';
import { IMatchUserContent } from '../../interfaces/DtoContents';

export const matchUserContentDTO = ({ body }: Request): IMatchUserContent => (
  {
    ...body,
    filmingCosts: body.filmingCosts.toString(),
    advance: body.advance.toString(),
    feePaid: body.feePaid.toString(),
    recoveredCosts: body.recoveredCosts.toString(),
  }
);

export const addComedianContentDTO = ({ body }: Request):
 { contentIds: number[]; userId: number } => (
  {
    contentIds: body.contentIds,
    userId: body.userId,
  }
);
