import ProjectThumbCompound from '@/compounds/ProjectThumbCompound';
import React from 'react';

export default function profile() {
  return (
    <div className="w-full flex justify-center">
      <div className="inner">
        <div className="text-[30px] font-bold py-10 px-2">
          <div>내 프로젝트 목록</div>
          <ProjectThumbCompound />
        </div>
        <div className="text-[30px] font-bold py-10 px-2">
          <div>내 NFT 목록</div>
          <ProjectThumbCompound />
        </div>
        <div className="text-[30px] font-bold py-10 px-2">
          <div>내 파츠 NFT</div>
          <ProjectThumbCompound />
        </div>
      </div>
    </div>
  );
}
