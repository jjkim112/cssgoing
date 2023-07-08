import { OneProject } from "@/domain/OneProject";
import axios from "axios";
import { createContext, useState, useContext, ReactNode } from "react";
import { HexString16Bytes } from "web3";

import mockdata from "../mock-data/v2/projects.json";

interface TicketProjectListContextType {
  contracts: OneProject[];
  updateList: (value: string[]) => Promise<void>;
  getProject: (addr: string) => OneProject | null;
  updateTickets: (addr: string) => Promise<void>;
}
const TicketProjectListContext = createContext<TicketProjectListContextType>({
  contracts: [],
  updateList: async () => {},
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

  const isInCache = () => {
    return false;
  };
  const updateList = async (list: string[]) => {
    const ticketAddresses = ["1234", "2345"];
    let projects: OneProject[] = [];

    for (let index = 0; index < ticketAddresses.length; index++) {
      const t_addr: string = ticketAddresses[index];
      if (isInCache()) {
        // TODO 기존 값을 return
        // 쟁점 부분. for문으로 읽어들이면, O(n)...
      } else {
        const ticketContract = mockdata.find((v, _) => v.address === t_addr);
        if (ticketContract != null) {
          // TODO 이부분은 Ticket Conctract 의 ~~/1.json 을 호출
          const jsonData = await axios.get(ticketContract.urls[0]);
          projects.push(OneProject.fromWebData(jsonData, t_addr));
        }
      }
    }
    setProjects(projects);
  };

  const getProject: (addr: string) => OneProject | null = (addr) => {
    projects.forEach((v, _) => {
      if (v.contract === addr) {
        return v;
      }
    });
    return null;
  };

  const updateTickets = async (addr: string) => {
    setProjects((prev) => {
      let tempList: OneProject[] = [];
      for (let index = 0; index < prev.length; index++) {
        const element = prev[index];
        if (element.contract === addr) {
          element.contract = addr;
          // TODO TicketURls 불러오는 함수.
          const ticketUrls = [];

          tempList.push(element);
        } else {
          tempList.push(element);
        }
      }
      return tempList;
    });
  };

  return (
    <TicketProjectListContext.Provider
      value={{
        contracts: projects,
        updateList,
        getProject,
        updateTickets,
      }}
    >
      {children}
    </TicketProjectListContext.Provider>
  );
}

export const useTicketProjectList = () => useContext(TicketProjectListContext);
