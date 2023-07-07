"use client";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import FormData from "form-data";
import zeroData from "../../../temp/0.json";
import { getProjectsFromTicketAddresses } from "@/domain/OneProject";
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

  const src = "./pinata";

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

  const jsonToFile = (json: object, filename: string): File => {
    // JSON 객체를 Blob 객체로 변환
    const jsonString = JSON.stringify(json);
    const blob = new Blob([jsonString], { type: "application/json" });

    // Blob 객체에 파일 이름을 부여하여 File 객체로 변환
    return new File([blob], filename, { type: "application/json" });
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    // if (!file) {
    //   alert("Please select a file");
    //   return;
    // }
    // const files = [...file];
    // console.log(files);

    // const form = new FormData();
    // files.map((v, i) => {
    //   form.append(`file`, v);
    //   console.log(v);
    // });

    const form = new FormData();
    for (let index = 0; index < 5; index++) {
      const jsonFile = jsonToFile({ key: "asdf" }, "asdf.json");
      form.append("file", jsonFile, "data/asdf.json");
    }

    const jsonFile1 = jsonToFile({ key: "value1" }, "f1.json");
    form.append("file", jsonFile1, "data/f1.json");
    const jsonFile2 = jsonToFile({ key: "value2" }, "f2.json");
    form.append("file", jsonFile2, "data/f2.json");
    const jsonFile3 = jsonToFile({ key: "value3" }, "f3.json");
    form.append("file", jsonFile3, "data/f3.json");
    const jsonFile4 = jsonToFile({ key: "value4" }, "f4.json");
    form.append("file", jsonFile4, "data/f4.json");

    console.log(jsonFile1);
    console.log(jsonFile2);

    form.append(
      "pinataMetadata",
      JSON.stringify({
        name: "testt1243",
      })
    );
    form.append(
      "pinataOptions",
      JSON.stringify({ wrapWithDirectory: true, cidVersion: 1 })
    );

    // if (metadata) {
    //   form.append("pinataMetadata", JSON.stringify(metadata));
    // }
    // if (options) {
    //   form.append(
    //     "pinataOptions",
    //     JSON.stringify({ wrapWithDirectory: false, cidVersion: 0 })
    //   );
    // }

    // var data = JSON.stringify({
    //   pinataOptions: {
    //     cidVersion: 2,
    //     wrapWithDirectory: true,
    //   },
    //   pinataMetadata: {
    //     name: "testing",
    //     keyvalues: {
    //       customKey: "customValue",
    //       customKey2: "customValue2",
    //       customKey3: "customValue3",
    //     },
    //   },
    //   pinataContent: {
    //     somekey: "somevalue",
    //     somekey2: "somevalue2",
    //   },
    // });

    // json 파일 하나 넘기기

    // try {
    //   const res = await axios.post(
    //     "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    //     data,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${pinataJwt}`,
    //       },
    //     }
    //   );
    //   console.log(res.data);
    // } catch (error) {
    //   console.error(error);
    // }

    const res = await axios
      .post("https://api.pinata.cloud/pinning/pinFileToIPFS", form, {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
          Authorization: `Bearer ${pinataJwt}`,
        },
      })
      .then((v) => {
        console.log(v);
      });
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
      <div
        className="border-2 border-red-500 h-10"
        onClick={() => {
          getProjectsFromTicketAddresses(["", ""]);
        }}
      >
        {" "}
        test button{" "}
      </div>
      {result && <div>File uploaded to {result}</div>}
    </form>
  );
}
