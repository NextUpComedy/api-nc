import { Request, Response, NextFunction } from 'express';
import { deletePlan } from '../../services';
import { constants, dto } from '../../helpers';

export default async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const planId = dto.adminDTO.deletePlanDTO(request);

  const { messages } = constants;

  try {
    const plans = await deletePlan(planId);
    response.json({ data: plans, message: messages.authResponse.PLAN_DELETED });
  } catch (error) {
    next(error);
  }
};
