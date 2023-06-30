import React, { ReactNode } from 'react';
import './ProjectStyles.css';

function ProjectCreateButton({ ...restProps }) {
  return (
    <div className="project-create-button" {...restProps}>
      Project 생성
    </div>
  );
}

export default ProjectCreateButton;
