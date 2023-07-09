"use client";
import { useEffect, useState } from "react";

// import projectMockData from "@/mock-data/v0/projects.json";
import projectMockData from "@/mock-data/v1/projects.json";
import OneProjectPart, {
  ProjectData,
} from "@/components/Project/main/OneProjectPart";
import ProjectCreateButton from "@/components/Project/main/ProjectCreateButton";
import ProjectThumbCompound from "@/compounds/ProjectThumbCompound";
import { useSearchParams } from "next/navigation";
import OneTicketCheckPart from "@/components/Project/main/OneTicketCheckPart";
import { OneProject } from "@/domain/OneProject";
import { OneTicket } from "@/domain/OneTicket";
import { useTicketProjectList } from "@/context/contractContext";

export default function TicketCheck() {
  const params = useSearchParams();
  const ticketIdStr = params.get("id") ?? "";
  const t_addr = params.get("contract") ?? "";
  const [oneProjectData, setOneProjectData] = useState<OneProject | null>(null);
  const [oneTicketData, setOneTicketData] = useState<OneTicket | null>(null);

  const { getProject, getTicket } = useTicketProjectList();

  const initSet = async () => {
    const tempProject = getProject(t_addr);
    const tempTicket = await getTicket(t_addr, ticketIdStr);
    if (tempProject !== null && tempTicket !== null) {
      setOneProjectData(tempProject);
      setOneTicketData(tempTicket);
    }
  };
  useEffect(() => {
    initSet();
  }, []);

  return (
    <div className="bg-white">
      {ticketIdStr !== null &&
      oneProjectData !== null &&
      oneTicketData !== null ? (
        <OneTicketCheckPart
          projectData={oneProjectData}
          ticketData={oneTicketData}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
