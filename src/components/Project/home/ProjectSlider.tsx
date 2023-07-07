"use client";
import React, { useState } from "react";
// import projectMockData from "../../../mock-data/v0/projects.json";
import projectMockData from "../../../mock-data/v1/projects.json";
import OneProjectThumb from "./OneProjectThumb";
import { useTicketProjectList } from "@/context/contractContext";
import { OneProject } from "@/domain/OneProject";

interface tikectAvailable {
  available: boolean;
}

function ProjectSlider({ available }: tikectAvailable) {
  //const { projects } = useTicketProjectList();

  return (
    <div className="flex flex-wrap justify-center gap-6 ">
      {/* {projects.map((v: OneProject, _) => {
        return <OneProjectThumb key={v.contract} value={v!} />;
      })} */}
    </div>
  );
}

export default ProjectSlider;
