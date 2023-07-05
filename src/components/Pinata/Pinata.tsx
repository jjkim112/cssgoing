'use client';
import axios from 'axios';
import pinataSDK from '@pinata/sdk';
import { useEffect } from 'react';
import FormData from 'form-data';
import fs from 'fs';
const JWT = `Bearer ${process.env.NEXT_PUBLIC_JWT}`;
const pinata = new pinataSDK(
  `${process.env.NEXT_PUBLIC_API_KEY}`,
  `${process.env.NEXT_PUBLIC_PRIVATE_API}`
);

export default function PinataPage() {
  const pinataConfig = async () => {
    const formData = new FormData();
    const src = '/images/logo.png';

    const file = fs.createReadStream(src);
    formData.append('file', file);

    const metadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append('pinataOptions', options);

    try {
      const res = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          headers: {
            'Content-Type': `multipart/form-data; boundary=${formData}`,
            Authorization: JWT,
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    pinataConfig();
  });

  return <div className="w-full flex justify-center">pinata</div>;
}
