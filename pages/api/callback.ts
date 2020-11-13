import request from 'request';
import { NextApiHandler } from 'next';

const redirect_uri = process.env.REDIRECT_URI || 'http://localhost:3000/api/callback';

const handler: NextApiHandler = (req, res) => {
  console.log('CALLBACK HIT');
  let code = req.query.code || null;
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
        ).toString('base64')
    },
    json: true
  };

  // TODO: remove request dependency
  request.post(authOptions, function (error, response, body) {
    var access_token = body.access_token;
    let uri = process.env.FRONTEND_URI || 'http://localhost:3000';
    res.redirect(uri + '?access_token=' + access_token);
  });
};

export default handler;
