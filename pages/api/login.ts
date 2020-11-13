import { NextApiHandler } from 'next';
import querystring from 'querystring';

const redirect_uri = process.env.REDIRECT_URI || 'http://localhost:3000/api/callback';

const handler: NextApiHandler = (_, res) => {
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: 'user-read-private user-read-email',
        redirect_uri
      })
  );
};

export default handler;
