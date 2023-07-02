"use client";
import React from "react";
// import projectMockData from "../../../mock-data/v0/projects.json";
import projectMockData from "../../../mock-data/v1/projects.json";
import OneProjectThumb from "./OneProjectThumb";

function ProjectSlider() {
  return (
    //<div className="grid grid-cols-4 gap-6">
    <div className="flex flex-wrap justify-center gap-6">
      {projectMockData.map((v, index) => {
        return (
          // v0
          // <OneProjectThumb
          //   key={v.id}
          //   id={v.id}
          //   contract={v.contract}
          //   title={v.title}
          //   imgUrl={v.imgUrl}
          //   qeustsNum={v.quests.length}
          // />
          <OneProjectThumb
            key={v.id}
            id={v.id}
            contract={v.contract}
            title={v.title}
            imgUrl={v.imgUrl}
            tickets={v.tickets}
          />
        );
      })}
    </div>
  );
}

export default ProjectSlider;
