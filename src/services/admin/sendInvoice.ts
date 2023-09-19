import sgMail from '@sendgrid/mail';
import { AES, enc } from 'crypto-js';
import { Payout } from 'nc-db-new';
import { generateInvoice } from '../../helpers';
import { getNumberOfContent, getUserById } from '../user';
import config from '../../config';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
const { ENCRYPTION_SECRET_KEY } = config.server;

const decryptData = (encryptedData: string): string => {
  const decryptedBytes = AES.decrypt(encryptedData, ENCRYPTION_SECRET_KEY);
  const decryptedText = decryptedBytes.toString(enc.Utf8);
  return decryptedText;
};

export default async function sendInvoice(userId: number, payoutId:number): Promise<void> {
  const user = await getUserById(userId);
  const isVatPayer = user?.vatPayer;
  let vatPercentage = 0;
  if (isVatPayer === false) {
    vatPercentage = 0;
  } else if (isVatPayer === true) {
    vatPercentage = 20;
  }
  const content = await getNumberOfContent({
    page: 1,
    limit: 40,
    userId: Number(user?.id),
  });
  let msg: any = {};
  let accmsg: any = {};
  const sums:any = [];
  if (content.rows.every((row) => JSON.stringify(row?.otherRevenue ?? {}) === '{}' || JSON.stringify(row?.otherRevenue ?? []) === '[]')) {
    const products = content.rows.map((item) => ({
      quantity: 1,
      description: item.title,
      tax: vatPercentage,
      price: item.owedAccRevenue,
    }));

    const generateInvoiceResult = await generateInvoice({
      holderName: decryptData(user?.accountHolderName as string),
      accountNumber: decryptData(user?.accountNumber as string),
      sortCode: decryptData(user?.sortCode as string),
      products,
    });
    const recipients = [user?.email];

    msg = {
      to: recipients.filter((recipient) => recipient) as any,
      from: process.env.SENDGRID_ADMIN_EMAIL as string,
      subject: ' Copy of your NextUp Invoice',
      templateId: process.env.SENDGRID_INVOICE_TEMPLATE_ID as string,
      attachments: [
        {
          content: generateInvoiceResult.pdf.toString('base64'),
          filename: 'invoice.pdf',
          type: 'application/pdf',
          disposition: 'attachment',
        },
      ],
    };
    // save invoice in payout table where payoutId = payoutId
    Payout.update(
      { invoice: generateInvoiceResult.pdf.toString('base64') },
      {
        where: {
          id: payoutId,
        },
      },
    );

    accmsg = {
      to: process.env.ACCOUNTENT_EMAIL as string,
      from: process.env.SENDGRID_ADMIN_EMAIL as string,
      subject: 'Invoice - Act Revenue Share and Deal Revenue',
      templateId: process.env.SENDGRID_ACCT_INVOICE_TEMPLATE_ID as string,
      attachments: [
        {
          content: generateInvoiceResult.pdf.toString('base64'),
          filename: 'invoice.pdf',
          type: 'application/pdf',
          disposition: 'attachment',
        },
      ],
    };
  } else {
    const listOfOtherRevenueAndTitle = content.rows.map((item) => ({
      otherRevenue: item.otherRevenue,
      title: item.title,
    }));
    let sum = 0;
    const listOfOtherRevenueAsProducts = listOfOtherRevenueAndTitle.map(
      (item) => {
        const otherRevenueString = JSON.stringify(item.otherRevenue);
        const otherRevenueObj = JSON.parse(otherRevenueString);

        const servicesRevenue = otherRevenueObj.reduce(
          (accumulator: any, current: any) => accumulator + parseInt(current.revenue, 10),
          0,
        );
        sum = servicesRevenue;
        sums.push(sum); // Store the sum for the current content item

        return otherRevenueObj.map((row: any) => ({
          quantity: 1,
          description: `${item.title} - ${row.service}`,
          tax: vatPercentage,
          price: Number(row.revenue),
        }));
      },
    );

    const products = content.rows
      .filter((item) => Number(item.owedAccRevenue) !== Number(sum))
      .map((item, index) => ({
        quantity: 1,
        description: `${item.title} - Subscription Revenue Share`,
        tax: vatPercentage,
        price: Number(item.owedAccRevenue) - Number(sums[index]),
      }));

    const generateInvoiceResult = await generateInvoice({
      holderName: `Account Name: ${user?.accountHolderName}`,
      accountNumber: `Account Number: ${user?.accountNumber}`,
      sortCode: `Account Sort Code: ${user?.sortCode}`,
      stripeId: `Stripe Acount Id: ${user?.stripeAccount}`,
      products: products.concat(listOfOtherRevenueAsProducts.flat()),
    });
    const recipients = [user?.email, process.env.ACCOUNTENT_EMAIL as string];
    msg = {
      to: recipients.filter((recipient) => recipient) as any,
      from: process.env.SENDGRID_ADMIN_EMAIL as string,
      subject: ' Copy of your NextUp Invoice',
      templateId: process.env.SENDGRID_INVOICE_TEMPLATE_ID as string,
      attachments: [
        {
          content: generateInvoiceResult.pdf.toString('base64'),
          filename: 'invoice.pdf',
          type: 'application/pdf',
          disposition: 'attachment',
        },
      ],
    };

    accmsg = {
      to: process.env.ACCOUNTENT_EMAIL as string,
      from: process.env.SENDGRID_ADMIN_EMAIL as string,
      subject: 'Invoice - Act Revenue Share and Deal Revenue',
      templateId: process.env.SENDGRID_ACCT_INVOICE_TEMPLATE_ID as string,
      attachments: [
        {
          content: generateInvoiceResult.pdf.toString('base64'),
          filename: 'invoice.pdf',
          type: 'application/pdf',
          disposition: 'attachment',
        },
      ],
    };
  }
  await sgMail.send(msg);
}
