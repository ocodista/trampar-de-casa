import { NextApiRequest, NextApiResponse } from 'next';
 
export default function cron(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  response.status(200).json({
    body: 'Hello world',
    query: request.query,
    cookies: request.cookies,
  });
}