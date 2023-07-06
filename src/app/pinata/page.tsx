'use client';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import FormData from 'form-data';
const basePathConverter = require('base-path-converter');
const pinataJwt = process.env.NEXT_PUBLIC_JWT;

export default function PinataForm(): JSX.Element {
  const [file, setFile] = useState<FileList | undefined>();
  const [metadata, setMetadata] = useState<
    { [key: string]: string } | undefined
  >();

  const [options, setOptions] = useState<
    { [key: string]: string } | undefined
  >();
  const [result, setResult] = useState();

  const src = './pinata';

  const handleFileChange = async (event: any) => {
    event.preventDefault();
    if (!event.target.files) {
      return;
    }
    console.log(event.target.files);
    setFile(event.target.files);
  };

  const handleMetadataChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!event.target.name || !event.target.value) {
      return;
    }
    setMetadata((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleOptionsChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!event.target.name || !event.target.value) {
      return;
    }
    setOptions((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      alert('Please select a file');
      return;
    }
    const files = [...file];
    console.log(files);

    const form = new FormData();
    files.map((v, i) => {
      form.append(`file`, v);
    });

    if (metadata) {
      form.append('pinataMetadata', JSON.stringify(metadata));
    }

    if (options) {
      form.append(
        'pinataOptions',
        JSON.stringify({ wrapWithDirectory: false, cidVersion: 0 })
      );
    }

    // var data = JSON.stringify({
    //   pinataOptions: {
    //     cidVersion: 1,
    //     wrapWithDirectory: true,
    //   },
    //   pinataMetadata: {
    //     name: 'testing',
    //     keyvalues: {
    //       customKey: 'customValue',
    //       customKey2: 'customValue2',
    //     },
    //   },
    //   pinataContent: {
    //     somekey: 'somevalue',
    //   },
    // });
    // var config = {
    //   method: 'post',
    //   url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${pinataJwt}`,
    //   },
    //   data: data,
    // };

    try {
      const res = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        form,
        {
          maxBodyLength: 'Infinity',
          headers: {
            'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
            Authorization: `Bearer ${pinataJwt}`,
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <div>
        <input
          directory=""
          webkitdirectory=""
          type="file"
          onChange={handleFileChange}
        />
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" onChange={handleMetadataChange} />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input type="text" name="description" onChange={handleMetadataChange} />
      </div>
      <div>
        <label htmlFor="cidVersion">CID Version:</label>
        <input type="number" name="cidVersion" onChange={handleOptionsChange} />
      </div>
      <button type="submit">Upload</button>
      {result && <div>File uploaded to {result}</div>}
    </form>
  );
}
