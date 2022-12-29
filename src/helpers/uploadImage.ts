import S3 from 'aws-sdk/clients/s3';

import config from '../config';
import { CustomError } from '.';

const {
  AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY,
} = config.server;

const s3 = new S3({
  region: AWS_BUCKET_REGION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

async function upload(image: any, userId: number): Promise<any> {
  const base64ToBuffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  const type = image.split(';')[0].split('/')[1];

  const params = {
    Bucket: `${AWS_BUCKET_NAME}`,
    Body: base64ToBuffer,
    Key: `${userId}/${Date.now()}.${type}`,
    ContentEncoding: 'base64',
    ContentType: `image/${type}`,
  };

  try {
    const { Location } = await s3.upload(params).promise();

    return { Location };
  } catch (error : any) {
    throw new CustomError(`${`${error.code} : ${error.message}`}`, error.statusCode);
  }
}

export default upload;
