import React, { ReactNode } from "react";
import "./ProjectStyles.css";
import Link from "next/link";

function ProjectCreateButton() {
  return (
    <Link href="project/create">
      <div className="project-create-button">Project 생성</div>
    </Link>
  );
}

export default ProjectCreateButton;
