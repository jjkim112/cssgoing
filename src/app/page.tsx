import { NextPage } from 'next';
import ProjectThumbCompount from '@/compounds/ProjectThumbCompound';

const Home: NextPage = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="inner">
        <div>
          <div className="main_contentTitle ">현재 티켓 현황</div>
          <ProjectThumbCompount />
        </div>
      </div>
    </div>
  );
};

export default Home;
