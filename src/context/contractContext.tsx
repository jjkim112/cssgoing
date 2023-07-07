import { OneProject } from "@/domain/OneProject";
import { createContext, useState, useContext, ReactNode } from "react";
import { HexString16Bytes } from "web3";

interface TicketProjectListContextType {
  contracts: OneProject[];
  addItem: (value: OneProject) => void;
  updateList: (value: HexString16Bytes[]) => void;
  getProject: (addr: string) => OneProject | null;
}
const TicketProjectListContext = createContext<TicketProjectListContextType>({
  contracts: [],
  addItem: () => {},
  updateList: () => {},
  getProject: () => {
    return null;
  },
});

export default function TicketProjectListProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [projects, setProjects] = useState<OneProject[]>([]);

  const addItem = async (value: OneProject) => {
    setProjects((prevItems) => [...prevItems, value]);
  };

  const updateList = (list: string[]) => {
    // input 값은 각 1번 token url 이다.
    // TODO Cache 알고리즘. 이미 한번 부른 친구면,. axios 안하기.
    setProjects((prev) => prev);
  };

  const getProject: (addr: string) => OneProject | null = (addr) => {
    projects.forEach((v, _) => {
      if (v.contract === addr) {
        return v;
      }
    });
    return null;
  };

  return (
    <TicketProjectListContext.Provider
      value={{
        contracts: projects,
        addItem,
        updateList,
        getProject,
      }}
    >
      {children}
    </TicketProjectListContext.Provider>
  );
}

export const useTicketProjectList = () => useContext(TicketProjectListContext);
