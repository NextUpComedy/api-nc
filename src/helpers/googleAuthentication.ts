import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';
import config from '../config';
import { IGoogleAuthentication } from '../interfaces';

type GoogleAuth = (tokenId: string) => Promise<IGoogleAuthentication>;
const { CLIENT_ID } = config.server;
const client = new OAuth2Client(CLIENT_ID);

const googleAuthentication: GoogleAuth = async (tokenId: string) => {
  const verify = async ():Promise<void> => {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload?.sub;
  };
  verify().catch(console.error);
  const {
    data: {
      sub,
      email,
      name,
      picture: image,
    },
  } = await axios.get(
    `${config.server.GOOGLE_API}tokeninfo?id_token=${tokenId}`,
  );
  return ({
    googleId: sub, email, name, image,
  });
};

export default googleAuthentication;
