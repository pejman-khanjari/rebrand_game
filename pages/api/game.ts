import { NextApiRequest, NextApiResponse } from 'next';
import requestIp from 'request-ip';
import { Game } from '../../services/game';

const gameAnswer = 'لندو';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({
      statusCode: 405,
      message: 'Method Not Allowed',
    });

  const { letter } = req.body;

  if (!letter) return res.status(400).json({ message: 'Letter is required' });
  if (letter.length > 1) return res.status(400).json({ message: 'Letter should be one character' });

  const playerIp = requestIp.getClientIp(req);

  if (!playerIp) return res.status(400).json({ message: 'IP Not Found!!' });

  const game = new Game(playerIp, gameAnswer);

  const { user: player, status } = game.play(letter);
  return res.status(status).json(player);
};

export default handler;
