import ProjectCreateButton from "@/components/Project/main/ProjectCreateButton";
import ProjectThumbCompount from "@/compounds/ProjectThumbCompound";
export default function project() {
  return (
    <div className="w-full flex justify-center">
      <div className="inner">
        <ProjectCreateButton />
        <div className="main_contentTitle ">현재 진행중인 프로젝트</div>
        <ProjectThumbCompount />
      </div>
    </div>
  );
}
