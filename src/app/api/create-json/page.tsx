import { NextResponse, NextRequest } from 'next/server';
import fs from 'fs';

export default async (req: NextResponse, res: NextRequest) => {
  const { data } = res.body;

  try {
    console.log(req);
    fs.writeFileSync('data/data.json', JSON.stringify(data));
    console.log('File created successfully');
  } catch (error) {
    console.error(error);
    if (res) {
    }
  }
};
