'use client';
import React from 'react';
import projectMockData from '../../../mock-data/v0/projects.json';
import OneProjectThumb from './OneProjectThumb';

function ProjectSlider() {
  return (
    <div className="flex justify-center">
      <div className="grid  grid-cols-4 gap-6  w-[1850px]">
        {projectMockData.map((v, index) => {
          return (
            <OneProjectThumb
              key={v.id}
              id={v.id}
              contract={v.contract}
              title={v.title}
              imgUrl={v.imgUrl}
              qeustsNum={v.quests.length}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ProjectSlider;
