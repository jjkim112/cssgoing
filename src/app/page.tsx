import { NextPage } from 'next';
import ProjectThumbCompount from '@/compounds/ProjectThumbCompound';
const Home: NextPage = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="inner">
        <ProjectThumbCompount />
      </div>
    </div>
  );
};

export default Home;
