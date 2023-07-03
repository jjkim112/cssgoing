'use client';
import React from 'react';
// import projectMockData from "../../../mock-data/v0/projects.json";
import projectMockData from '../../../mock-data/v1/projects.json';
import OneProjectThumb from './OneProjectThumb';

interface tikectAvailable {
  available: boolean;
}

function ProjectSlider({ available }: tikectAvailable) {
  return (
    <div className="flex flex-wrap justify-center gap-6 ">
      {projectMockData.map((v, index) => {
        return (
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
