"use client";
import OneProjectThumb from "@/components/Project/home/OneProjectThumb";
import { ProjectData } from "@/components/Project/main/OneProjectPart";
import { useTicketProjectList } from "@/context/contractContext";
import React, { useContext, useEffect, useState } from "react";

function MyTicketsCompound() {
  const { contracts } = useTicketProjectList();
  const [myNfts, setMyNfts] = useState<ProjectData[]>([]);

  useEffect(() => {
    let tempList: ProjectData[] = [];
    for (let index = 0; index < contracts.length; index++) {
      const c_address = contracts[index];

      tempList.push({
        id: 1,
        contract: c_address,
        title: c_address,
        description: c_address,
        imgUrl:
          "https://cdn.galxe.com/galaxy/opside/aaa17f58-7ab8-405e-906f-a46063d1e5c0.png",
        tickets: [],
      });
    }

    setMyNfts(tempList);
  });

  return (
    <div className="bg-white">
      <span className="text-3xl font-bold">My NFT Compound</span>
      <div className="flex flex-wrap justify-center gap-6">
        {myNfts.map((v, i) => (
          <OneProjectThumb
            id={v.id}
            contract={v.contract}
            title={v.title}
            imgUrl={v.imgUrl}
            tickets={v.tickets}
          />
        ))}
      </div>
    </div>
  );
}

export default MyTicketsCompound;
