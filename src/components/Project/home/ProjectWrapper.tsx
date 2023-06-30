import React, { ReactNode } from "react";

interface HeaderProps {
  className?: string;
  children: ReactNode;
}
function ProjectWrapper({ className, children, ...restProps }: HeaderProps) {
  return (
    <div className={className} {...restProps}>
      {children}
    </div>
  );
}

export default ProjectWrapper;
