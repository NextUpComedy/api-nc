import { IUser } from 'nc-db-new';

export interface IForgetPassword {
  email: string,
}

export interface ILogin {
  rememberMe: string,
  password: string,
  email: string,
}

export interface IGoogleTokenId {
  tokenId: string,
}

export interface IResetPassword {
  password: string,
  resetPasswordToken: string,
}

export interface ISignup {
  password: string,
  name: string,
  email: string,
}

export interface IUserAuth {
user?: IUser
}
export interface IUserExist {
user: IUser
userId:number
}
