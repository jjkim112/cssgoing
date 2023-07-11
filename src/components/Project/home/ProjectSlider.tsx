'use client';
import React, { useState } from 'react';
// import projectMockData from "../../../mock-data/v0/projects.json";
import OneProjectThumb from './OneProjectThumb';
import { useTicketProjectList } from '@/context/contractContext';

interface tikectAvailable {
  available: boolean;
}

function ProjectSlider({ available }: tikectAvailable) {
  const { projects } = useTicketProjectList();

  return (
    <div className="project-wrapper ">
      {projects.map((oneProject, index) => {
        return (
          <OneProjectThumb
            key={oneProject.contract}
            contract={oneProject.contract}
            description={oneProject.description}
            title={oneProject.title}
            imgUrl={oneProject.imgUrl}
            tickets={oneProject.tickets}
          />
        );
      })}
    </div>
  );
}

export default ProjectSlider;
