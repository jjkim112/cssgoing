import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { data } = req.body;

  try {
    console.log(data);
    fs.writeFileSync('data/data.json', JSON.stringify(data));
    console.log('File created successfullyfdsfsdfsd');
    res.status(200).json({ message: 'File created successfullyfdsfdsfsd' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'File creation failed' });
  }
}
