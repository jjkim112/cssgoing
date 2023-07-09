"use client";
import { useEffect } from "react";
import { NextPage } from "next";
import ProjectThumbCompount from "@/compounds/ProjectThumbCompound";
import { useTicketProjectList } from "@/context/contractContext";
import { getWholeTicketContractList } from "@/utils/web3/web3_v2";

const Home: NextPage = () => {
  const { updateProjects } = useTicketProjectList();

  const updateProjectsList = async () => {
    const ticketAddresses = await getWholeTicketContractList();
    await updateProjects(ticketAddresses);
    console.log("update Whole Project Success!!");
  };

  useEffect(() => {
    updateProjectsList();
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div className="inner">
        <div>
          <div className="main_contentTitle ">현재 티켓 현황</div>
          <ProjectThumbCompount />
        </div>
      </div>
    </div>
  );
};

export default Home;
