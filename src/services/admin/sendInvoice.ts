import sgMail from '@sendgrid/mail';
import fs from 'fs';
import { generateInvoice } from '../../helpers';
import { getNumberOfContent, getUserById } from '../user';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export default async function sendInvoice(userId: number): Promise<void> {
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
    limit: 10,
    userId: Number(user?.id),
  });
  let msg: any = {};

  if (content.rows.every((row) => JSON.stringify(row?.otherRevenue) === '{}')) {
    const products = content.rows.map((item) => ({
      quantity: 1,
      description: item.title,
      tax: vatPercentage,
      price: item.owedAccRevenue,
    }));
    const generateInvoiceResult = await generateInvoice({
      holderName: user?.accountHolderName,
      accountNumber: user?.accountNumber,
      sortCode: user?.sortCode,
      stripeId: user?.stripeAccount,
      products,
    });
    const recipients = [user?.email, process.env.ACCOUNTENT_EMAIL as string];
    msg = {
      to: recipients.filter((recipient) => recipient) as any,
      from: process.env.SENDGRID_ADMIN_EMAIL as string,
      subject: 'Payment invoice',
      text: 'and easy to do anywhere, even with Node.js',
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
      .map((item) => ({
        quantity: 1,
        description: `${item.title} - Subscription Revenue Share`,
        tax: vatPercentage,
        price: Number(item.owedAccRevenue) - Number(sum),
      }));

    const generateInvoiceResult = await generateInvoice({
      holderName: `Account Name: ${user?.accountHolderName}`,
      accountNumber: `Account Number: ${user?.accountNumber}`,
      sortCode: `Account Sort Code: ${user?.sortCode}`,
      stripeId: `Stripe Account Id: ${user?.stripeAccount}`,
      products: products.concat(listOfOtherRevenueAsProducts.flat()),
    });
    fs.writeFileSync('invoice.pdf', generateInvoiceResult.pdf, 'base64');
    const recipients = [user?.email, process.env.ACCOUNTENT_EMAIL as string];
    msg = {
      to: recipients.filter((recipient) => recipient) as any,
      from: process.env.SENDGRID_ADMIN_EMAIL as string,
      subject: 'Payment invoice',
      text: 'and easy to do anywhere, even with Node.js',
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
}
