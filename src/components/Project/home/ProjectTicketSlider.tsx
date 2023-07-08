'use client';
import React from 'react';
// import projectMockData from "../../../mock-data/v0/projects.json";
import projectMockData from '../../../mock-data/v1/projects.json';
import TicketProjectCheck from './TicketProjectCheck';

interface tikectAvailable {
  available: boolean;
}

function ProjectTicketSlider({ available }: tikectAvailable) {
  return (
    <div className="project-wrapper  ">
      {projectMockData.map((v, index) => {
        return (
          <TicketProjectCheck
            key={v.id}
            id={v.id}
            contract={v.contract}
            title={v.title}
            description={v.description}
            imgUrl={v.imgUrl}
            tickets={v.tickets}
          />
        );
      })}
    </div>
  );
}

export default ProjectTicketSlider;
