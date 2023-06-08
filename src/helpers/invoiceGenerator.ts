import easyinvoice from 'easyinvoice';

const generateInvoice = async (payload: any): Promise<any> => {
  const {
    holderName, accountNumber, sortCode, products, stripeId,
  } = payload;

  let client = {};
  if (holderName === 'Account Name: null' && stripeId !== 'Stripe Account Id: null') {
    client = {
      company: '',
      zip: '',
      address: stripeId,
    };
  } else {
    client = {
      company: holderName,
      address: accountNumber,
      zip: sortCode,
    };
  }

  const invoiceNumber = `2023${Math.floor(Math.random() * 1000000)}`;
  const currentDate = new Date();
  const nextMonth = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
  const theItems = products.map((item: any) => ({
    quantity: item.quantity,
    description: item.description,
    'tax-rate': item.tax,
    price: item.price,
  }));

  const data = {
    sender: {
      company: 'NextUp Comedy Limited',
      address: 'The Lower Vestry',
      zip: 'St George’s Bloomsbury',
      city: '6-7 Little Russell Street',
      country: 'London WC1A 2HR',
    },
    client,
    information: {
      number: invoiceNumber,
      date: `${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`,
      'due-date': `${nextMonth.getDate()}/${nextMonth.getMonth() + 1}/${nextMonth.getFullYear()}`,
    },
    products: theItems,
    'bottom-notice': 'The payment is due within 30 days.',
    settings: {
      currency: 'GBP',
      taxNotation: 'vat',
      taxPercent: 20,
    },
    translate: {
      products: 'Shows',
      price: 'Revenue',
      vat: 'VAT',
    },
  };
  const result = await easyinvoice.createInvoice(data);

  return result;
};

export default generateInvoice;
