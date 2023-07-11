import { MetaMaskSDK } from '@metamask/sdk';
import Web3 from 'web3';
import QUEST_NFT_ABI from '@/lib/questContractAbi.json';
import TICKET_NFT_ABI from '@/lib/ticketContractAbi.json';

const MMSDK = new MetaMaskSDK({
  dappMetadata: {
    name: 'h662',
    url: 'https://h662.com',
  },
});
export const ethereum = MMSDK.getProvider();

export const web3 = new Web3(ethereum);

export const QUEST_NFT_ADDRESS = process.env.NEXT_PUBLIC_QUEST_NFT_ADDRESS;

export const questContract = new web3.eth.Contract(
  QUEST_NFT_ABI,
  QUEST_NFT_ADDRESS
);
export const ticketContract = (addr: string) => {
  return new web3.eth.Contract(TICKET_NFT_ABI, addr);
};
// export const ticketContract = new web3.eth.Contract(
//   TICKET_NFT_ABI,
//   TICKET_NFT_ADDRESS
// );

export const GOERLI_CHAIN_ID = 5;

export interface INft {
  name: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
}
