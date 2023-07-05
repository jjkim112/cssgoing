'use client';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import FormData from 'form-data';
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

  const handleFileChange = async (event: any) => {
    event.preventDefault();
    if (!event.target.files) {
      return;
    }
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

    const form = new FormData();
    for (let i = 0; i < file.length; i++) {
      form.append('file', file[i], {
        filename: `543543${i}.json`,
        filepath: `543543${i}.json`,
      });
    }

    if (metadata) {
      form.append('pinataMetadata', JSON.stringify(metadata));
    }

    if (options) {
      form.append(
        'pinataOptions',
        JSON.stringify({ wrapWithDirectory: true, cidVersion: 0 })
      );
    }

    // var config = {
    //   method: 'post',
    //   url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
    //   headers: {
    //     'Content-Type': `multipart/form-data; boundary=${form.getBoundary}`,
    //     Authorization: `Bearer ${pinataJwt}`,
    //   },
    //   data: form,
    // };
    var data = JSON.stringify({
      pinataOptions: {
        cidVersion: 1,
        wrapWithDirectory: true,
      },
      pinataMetadata: {
        name: 'testing',
        keyvalues: {
          customKey: 'customValue',
          customKey2: 'customValue2',
        },
      },
      pinataContent: {
        somekey: 'somevalue',
      },
    });
    var config = {
      method: 'post',
      url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${pinataJwt}`,
      },
      data: data,
    };

    try {
      const response = await axios(config);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <div>
        <input multiple type="file" onChange={handleFileChange} />
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
