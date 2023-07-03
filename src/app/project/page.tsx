import ProjectCreateButton from '@/components/Project/main/ProjectCreateButton';
import ProjectThumbCompount from '@/compounds/ProjectThumbCompound';
export default function project() {
  return (
    <div className="w-full flex justify-center">
      <div className="inner">
        <ProjectCreateButton />
        <ProjectThumbCompount />
      </div>
    </div>
  );
}
