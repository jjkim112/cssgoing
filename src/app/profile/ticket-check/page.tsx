'use client';
import { useEffect, useState } from 'react';

// import projectMockData from "@/mock-data/v0/projects.json";
import projectMockData from '@/mock-data/v1/projects.json';
import OneProjectPart, {
  ProjectData,
} from '@/components/Project/main/OneProjectPart';
import ProjectCreateButton from '@/components/Project/main/ProjectCreateButton';
import ProjectThumbCompound from '@/compounds/ProjectThumbCompound';
import { useSearchParams } from 'next/navigation';
import OneTicketCheckPart from '@/components/Project/main/OneTicketCheckPart';

export default function TicketCheck() {
  const params = useSearchParams();
  console.log(params.get('contract'));

  const id = params.get('id');
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
          <OneTicketCheckPart projectData={oneProjectData} />
        ) : (
          <OneTicketCheckPart projectData={null} />
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
