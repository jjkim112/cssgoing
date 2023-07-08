'use client';
import React, { useState } from 'react';
// import projectMockData from "../../../mock-data/v0/projects.json";
import projectMockData from '../../../mock-data/v1/projects.json';
import OneProjectThumb from './OneProjectThumb';
import { useTicketProjectList } from '@/context/contractContext';
import { OneProject } from '@/domain/OneProject';

interface tikectAvailable {
  available: boolean;
}

function ProjectSlider({ available }: tikectAvailable) {
  //const { projects } = useTicketProjectList();

  return (
    <div className="project-wrapper ">
      {projectMockData.map((v, index) => {
        return (
          <OneProjectThumb
            key={v.id}
            id={v.id}
            contract={v.contract}
            description={v.description}
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
