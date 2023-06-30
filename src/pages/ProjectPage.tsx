'use client';
import { useEffect, useState } from 'react';

import projectMockData from '@/mock-data/v0/projects.json';
import OneProjectPart, {
  ProjectData,
} from '@/components/Project/main/OneProjectPart';
import ProjectCreateButton from '@/components/Project/main/ProjectCreateButton';
import ProjectThumbCompound from '@/compounds/ProjectThumbCompound';
import { usePathname } from 'next/navigation';
export default function ProjectPage() {
  const id = usePathname()?.substring(9);
  console.log(id);
  const [oneProjectData, setOneProjectData] = useState<ProjectData | null>(
    null
  );
  useEffect(() => {
    if (id) {
      console.log('id exist!!');
      for (let index = 0; index < projectMockData.length; index++) {
        if (projectMockData[index].id == Number(id)) {
          setOneProjectData(projectMockData[index]);
          break;
        }
      }
    }
  });

  return (
    <div className="bg-white">
      {id != null ? (
        oneProjectData != null ? (
          <OneProjectPart projectData={oneProjectData} />
        ) : (
          <OneProjectPart projectData={null} />
        )
      ) : (
        <>
          <ProjectCreateButton />
          <ProjectThumbCompound />
        </>
      )}
    </div>
  );
}
