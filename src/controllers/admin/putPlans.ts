import { Request, Response, NextFunction } from 'express';
import { putPlans } from '../../services';
import { constants, dto } from '../../helpers';

export default async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const plans = dto.adminDTO.plansDTO(request);

  const { messages } = constants;

  try {
    const newPlans = await putPlans(plans);
    response.json({ data: newPlans, message: messages.authResponse.PLANS_UPDATED });
  } catch (error) {
    next(error);
  }
};
