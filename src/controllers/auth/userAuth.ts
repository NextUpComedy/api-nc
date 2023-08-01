import { Response, NextFunction } from 'express';
import { AES, enc } from 'crypto-js';
import { IUserRequest } from '../../interfaces';

import { constants, dto, errorMessages } from '../../helpers';
import config from '../../config';

export default async (request: IUserRequest, response: Response, next: NextFunction):
Promise<void> => {
  const { ENCRYPTION_SECRET_KEY } = config.server;

  const { messages, httpStatus } = constants;
  const { user } = dto.authDTO.userAuthDTO(request);
  const decryptData = (encryptedData: string): string => {
    const decryptedBytes = AES.decrypt(encryptedData, ENCRYPTION_SECRET_KEY);
    const decryptedText = decryptedBytes.toString(enc.Utf8);
    return decryptedText;
  };
  try {
    if (!user) throw errorMessages.NOT_EXIST_ERROR;
    const {
      id,
      userRoleId,
      email,
      name,
      image,
      preferredPayoutMethod,
      stripeAccount,
      accountNumber,
      accountHolderName,
      bankName,
      bankAddress,
      ibanNumber,
      swiftCode,
      bicCode,
      sortCode,
    } = user;

    const data: Record<string, any> = {
      id,
      roleId: userRoleId,
      email,
      name,
      image,
      preferredPayoutMethod,
    };

    // Check if each field is not null, and if not, add the decrypted value to the data object
    if (accountNumber !== null && accountNumber !== undefined) {
      data.accountNumber = decryptData(accountNumber);
    }
    if (accountHolderName !== null && accountHolderName !== undefined) {
      data.accountHolderName = decryptData(accountHolderName);
    }
    if (bankName !== null && bankName !== undefined) {
      data.bankName = decryptData(bankName);
    }
    if (bankAddress !== null && bankAddress !== undefined) {
      data.bankAddress = decryptData(bankAddress);
    }
    if (ibanNumber !== null && ibanNumber !== undefined) {
      data.ibanNumber = decryptData(ibanNumber);
    }
    if (swiftCode !== null && swiftCode !== undefined) {
      data.swiftCode = decryptData(swiftCode);
    }
    if (bicCode !== null && bicCode !== undefined) {
      data.bicCode = decryptData(bicCode);
    }
    if (sortCode !== null && sortCode !== undefined) {
      data.sortCode = decryptData(sortCode);
    }
    if (stripeAccount !== null && stripeAccount !== undefined) {
      data.stripeAccount = decryptData(stripeAccount);
    }

    response.status(httpStatus.OK).json({
      message: messages.authResponse.APPROVED_USER,
      data,
    });
  } catch (error) {
    next(error);
  }
};
