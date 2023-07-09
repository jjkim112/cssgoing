import { OneProject } from "@/domain/OneProject";
import axios from "axios";
import { createContext, useState, useContext, ReactNode } from "react";
import { HexString16Bytes } from "web3";

import mockdata from "../mock-data/v2/projects.json";
import { OneTicket } from "@/domain/OneTicket";

interface TicketProjectListContextType {
  projects: OneProject[];
  updateProjects: (value: string[]) => Promise<void>;
  getProject: (addr: string) => OneProject | null;
  updateTickets: (addr: string) => Promise<void>;
}
const TicketProjectListContext = createContext<TicketProjectListContextType>({
  projects: [],
  updateProjects: async () => {},
  getProject: () => {
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
      const metadataUrl =
        mockdata.find((v, _) => v.address === t_addr)?.metadataUrl ?? "";
      if (metadataUrl !== "") {
        const ticketUrl = metadataUrl + "1.json";
        let jsonData = fromCache(ticketUrl);
        if (jsonData === undefined) {
          jsonData = await axios.get(ticketUrl);
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
    console.log("update projects part");
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
    let ticketId = "";
    let isSell = false;
    let url = "";
    if (ticketStr.includes("_")) {
      isSell = true;
      ticketId = ticketStr.split("_")[0];

      if (ticketStr.split("_")[1] === "sell") {
        url = metadataUrl + ticketId + ".json"; // 1.json
      } else {
        url = metadataUrl + ticketStr + ".json"; // 1_use.json
      }
    } else {
      ticketId = ticketStr;
      url = metadataUrl + ticketStr + ".json";
    }
    return { ticketId, isSell, url };
  };

  const updateTickets = async (t_addr: string) => {
    let tempList: OneProject[] = [];
    for (let index = 0; index < projects.length; index++) {
      const oneProject = projects[index];
      if (oneProject.contract === t_addr) {
        // TODO TicketURls 불러오는 함수 <= web3 함수
        // token ID 리스트 + 공통 metaUrl (id 보낼때 '1', '1_sell','1_use')
        const metadataUrl: string =
          mockdata.find((v, _) => v.address === t_addr)?.metadataUrl ?? "";
        if (metadataUrl !== "") {
          const ticketIds: string[] =
            mockdata.find((v, _) => v.address === t_addr)?.ids ?? [];
          let ticketList: OneTicket[] = [];
          for (let index = 0; index < ticketIds.length; index++) {
            const { ticketId, isSell, url } = fromTicketData(
              ticketIds[index],
              metadataUrl
            );

            let jsonData = fromCache(url);
            if (jsonData === undefined) {
              jsonData = await axios.get(url);
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
            }
            ticketList.push(
              OneTicket.fromWebData(jsonData, t_addr, Number(ticketId), isSell)
            );
          }
          oneProject.tickets = ticketList;
          tempList.push(oneProject);
        }
      } else {
        tempList.push(oneProject);
      }
    }
  };

  return (
    <TicketProjectListContext.Provider
      value={{
        projects,
        updateProjects,
        getProject,
        updateTickets,
      }}
    >
      {children}
    </TicketProjectListContext.Provider>
  );
}

export const useTicketProjectList = () => useContext(TicketProjectListContext);
