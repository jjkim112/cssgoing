import { createReadStream } from "fs";
import FormData from "form-data";
import axios, { AxiosRequestConfig } from "axios";

export const pinFileToIPFS = async () => {
  const jsonFilePath = "your_json_file_path.json";

  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  const apiKey = "your_api_key";
  const secretApiKey = "your_secret_api_key";

  const formData = new FormData();
  formData.append("file", createReadStream(jsonFilePath));

  const headers: AxiosRequestConfig = {
    headers: {
      ...formData.getHeaders(),
      pinata_api_key: apiKey,
      pinata_secret_api_key: secretApiKey,
    },
  };

  try {
    const response = await axios.post(url, formData, headers);
    const resultData = response.data;

    console.log("파일이 성공적으로 업로드되었습니다.");
    console.log(
      `IPFS URL: https://gateway.pinata.cloud/ipfs/${resultData.IpfsHash}`
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`업로드 실패: ${error.message}`);
    } else {
      console.error("Unknown error occurred");
    }
  }
};
