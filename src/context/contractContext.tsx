import { OneProject } from '@/domain/OneProject';
import axios from 'axios';
import { createContext, useState, useContext, ReactNode } from 'react';
import { OneTicket } from '@/domain/OneTicket';
import { getTicketContractUri, getWholeTicketList } from '@/utils/web3/web3_v2';

interface TicketProjectListContextType {
  projects: OneProject[];
  updateProjects: (value: string[]) => Promise<void>;
  getProject: (addr: string) => OneProject | null;
  getTicket: (t_addr: string, ticketIdStr: string) => Promise<OneTicket | null>;
  updateTickets: (addr: string) => Promise<void>;
}
const TicketProjectListContext = createContext<TicketProjectListContextType>({
  projects: [],
  updateProjects: async () => {},
  getProject: () => {
    return null;
  },
  getTicket: async () => {
    return null;
  },
  updateTickets: async () => {},
});

export default function TicketProjectListProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [projects, setProjects] = useState<OneProject[]>([]);

  let urlCache: Map<string, any> = new Map();

  const fromCache = (url: string) => {
    return urlCache.get(url);
  };

  const updateProjects = async (ticketAddresses: string[]) => {
    let tempProjects: OneProject[] = [];

    for (let index = 0; index < ticketAddresses.length; index++) {
      const t_addr: string = ticketAddresses[index];
      // todo ticketContract한테 1.json url 얻어오기
      const metadataUrl = (await getTicketContractUri(t_addr)) ?? '';
      // mockdata.find((v, _) => v.address === t_addr)?.metadataUrl ?? "";

      if (metadataUrl !== '') {
        const ticketUrl = metadataUrl + '/1.json';
        let jsonData = fromCache(ticketUrl);
        if (jsonData === undefined) {
          jsonData = await axios.get(ticketUrl);
          jsonData = jsonData.data;
          // jsonData = {
          //   image:
          //     "https://file2.nocutnews.co.kr/newsroom/image/2022/04/18/202204181135176917_0.jpg",
          //   name: "나훈아",
          //   description: "나훈아 20주년 콘서",
          //   attributes: [
          //     { trait_type: "Date", value: "2023년 07월 08일" },
          //     { trait_type: "Location", value: "제주 아트홀" },
          //     { trait_type: "Seat", value: "1-A" },
          //     { trait_type: "Price", value: "500000" },
          //     { trait_type: "RunningTime", value: "20:00~22:00" },
          //     { trait_type: "ticket_is_used", value: "false" },
          //     { trait_type: "minimum_attendance", value: "1" },
          //   ],
          // };
          urlCache.set(ticketUrl, jsonData);
        }
        tempProjects.push(OneProject.fromWebData(jsonData, t_addr));
      }
    }
    console.log('update projects part');
    console.log(tempProjects);
    setProjects(tempProjects);
  };

  const getProject: (addr: string) => OneProject | null = (addr) => {
    for (let index = 0; index < projects.length; index++) {
      const element = projects[index];
      if (element.contract === addr) {
        return element;
      }
    }
    return null;
  };

  const fromTicketData = (ticketStr: string, metadataUrl: string) => {
    let ticketId = 0;
    let isSell = false;
    let isUse = false;
    let url = '';
    if (ticketStr.includes('_')) {
      // 1_sell -> [ 1, sell ]
      isSell = true;
      ticketId = Number(ticketStr.split('_')[0]);

      if (ticketStr.split('_')[1] === 'sell') {
        url = metadataUrl + '/' + ticketId + '.json'; // 1.json
      } else {
        isUse = true;
        url = metadataUrl + '/' + ticketStr + '.json'; // 1_use.json
      }
    } else {
      ticketId = Number(ticketStr);
      url = metadataUrl + '/' + ticketStr + '.json';
    }
    return { ticketId, isSell, isUse, url };
  };

  const updateTickets = async (t_addr: string) => {
    let tempTickets: OneTicket[] = [];

    const ticketIdStrs = (await getWholeTicketList(t_addr)) ?? [];
    console.log('-------------updateTickets-------------');
    console.log('ticketIdStrs : ' + ticketIdStrs);
    const metadataURL = (await getTicketContractUri(t_addr)) ?? '';
    console.log('metadataURL : ' + metadataURL);
    if (typeof metadataURL === 'string') {
      for (let index = 0; index < ticketIdStrs.length; index++) {
        const ticketIdStr = ticketIdStrs[index];
        // 1 , 1_sell , 1_use
        const { ticketId, isSell, isUse, url } = fromTicketData(
          ticketIdStr,
          metadataURL
        );

        let jsonData = fromCache(url);
        if (jsonData === undefined) {
          jsonData = await axios.get(url);
          jsonData = jsonData.data;
          urlCache.set(url, jsonData);
        }

        tempTickets.push(
          OneTicket.fromWebData(jsonData, t_addr, ticketId, isSell, isUse)
        );
      }
    }
    console.log('tempTickets : ' + tempTickets);
    // tempTickets에 티켓이 전부 업데이트 되어 있는 상황

    // shallow copy 얕은 복사.

    // for (let index = 0; index < projects.length; index++) {
    //   const oneProjcet = projects[index];
    //   // t_addr 인 project에 tickets 를 업데이트 하기 위해서!!
    //   if (oneProjcet.contract === t_addr) {
    //     oneProjcet.tickets = tempTickets;
    //   }
    // }

    setProjects((prevProjects) => {
      let tempProjects: OneProject[] = [];
      for (let index = 0; index < prevProjects.length; index++) {
        const element = prevProjects[index];
        if (element.contract === t_addr) {
          element.tickets = tempTickets;
          tempProjects.push(element);
        } else {
          tempProjects.push(element);
        }
      }
      return tempProjects;
    });
  };
  const getTicket = async (t_addr: string, ticketIdStr: string) => {
    const metadataURL = (await getTicketContractUri(t_addr)) ?? '';
    if (typeof metadataURL === 'string') {
      const { ticketId, isSell, isUse, url } = fromTicketData(
        ticketIdStr,
        metadataURL
      );
      let jsonData = fromCache(url);
      if (jsonData === undefined) {
        jsonData = await axios.get(url);
        jsonData = jsonData.data;
        urlCache.set(url, jsonData);
      }
      return OneTicket.fromWebData(jsonData, t_addr, ticketId, isSell, isUse);
    }
    return null;
  };

  return (
    <TicketProjectListContext.Provider
      value={{
        projects,
        updateProjects,
        getProject,
        getTicket,
        updateTickets,
      }}
    >
      {children}
    </TicketProjectListContext.Provider>
  );
}

export const useTicketProjectList = () => useContext(TicketProjectListContext);
