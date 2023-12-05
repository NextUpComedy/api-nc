interface IEmailConfigs {
  SENDGRID_ADMIN_EMAIL: string;
  SENDGRID_API_KEY: string;
  SENDGRID_VERIFICATION_TEMPLATE_ID: string;
  SENDGRID_RESET_PASSWORD_TEMPLATE_ID: string;
  SENDGRID_APPROVAL_TEMPLATE_ID: string;
  SENDGRID_REJECTION_TEMPLATE_ID: string;
  NEXTUP_COMEDY_SUPPORT_EMAIL: string;
  SENDGRID_CREATE_USER_TEMPLATE_ID: string;
  SENDGRID_CREATE_ACCOUNTANT_TEMPLATE_ID: string;
  SENDGRID_CREATE_COMEDIAN_TEMPLATE_ID: string;
}

enum EmailType {
  verify = 'Verification Email',
  reset = 'Reset Password',
  approve = 'Approval Email',
  reject = 'Rejection Email',
}

interface IEmailService {
  email: string;
  type: string;
  name: string;
  redirectURL?: string;
  contactUs?: string;
  password?: string;
}

interface MailJSON {
  to: string;
  from: string;
  templateId: string;
  dynamicTemplateData: { [key: string]: string | undefined };
}

interface EmailResponse<TPayload = object> {
  statusCode: number;
  body: TPayload;
  headers: any;
}

interface EmailError {
  code: number;
  message: string;
  response: {
    headers: { [key: string]: string };
    body: string;
  };
}
export type ClientResponse = EmailResponse;
export type EmailTypes = { [key: string]: string };

export {
  IEmailConfigs, IEmailService, EmailType, MailJSON, EmailError,
};
