import { Request, Response, NextFunction } from 'express';
import { compare } from 'bcrypt';
import { AES, enc } from 'crypto-js';
import {
  constants,
  checkExistence,
  signToken,
  dto,
  errorMessages,
} from '../../helpers';
import { getUserByEmail } from '../../services';
import config from '../../config';

export default async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  const { email, password, rememberMe } = dto.authDTO.loginDTO(request);
  const { messages, httpStatus, expire } = constants;
  const { ENCRYPTION_SECRET_KEY } = config.server;
  const decryptData = (encryptedData: string): string => {
    const decryptedBytes = AES.decrypt(encryptedData, ENCRYPTION_SECRET_KEY);
    const decryptedText = decryptedBytes.toString(enc.Utf8);
    return decryptedText;
  };
  try {
    let expiresIn;
    if (rememberMe) { expiresIn = expire.EXP_30d; } else { expiresIn = expire.EXP_24h; }

    const userData = await getUserByEmail(email);

    const user = await checkExistence.ApprovalChecks(userData);

    const isValid = await compare(password, user.password);
    if (!isValid) {
      throw errorMessages.WRONG_EMAIL_OR_PASSWORD_ERROR;
    }

    const {
      id,
      userRoleId,
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
      vatPayer,
    } = user;

    const token = await signToken(
      {
        id: Number(id),
        name,
        email,
        roleId: userRoleId,
        preferredPayoutMethod,
      },
      { expiresIn },
    );
    const data: Record<string, any> = {
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

    response
      .status(httpStatus.OK)
      .cookie(messages.token.ACCESS_TOKEN, token, { httpOnly: true, sameSite: 'none', secure: true })
      .json({
        message: messages.authResponse.SUCCESS_LOGIN,
        payload: {
          name,
          image,
          email,
          roleId: userRoleId,
          id: Number(id),
          preferredPayoutMethod,
          stripeAccount: data.stripeAccount,
          accountNumber: data.accountNumber,
          accountHolderName: data.accountHolderName,
          bankName: data.bankName,
          bankAddress: data.bankAddress,
          ibanNumber: data.ibanNumber,
          swiftCode: data.swiftCode,
          bicCode: data.bicCode,
          sortCode: data.sortCode,
          vatPayer,
        },
      });
  } catch (error) {
    console.log(error);

    next(error);
  }
};
