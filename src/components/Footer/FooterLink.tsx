import React, { ReactNode } from 'react';
import './FooterStyles.css';
import Link from 'next/link';

interface FooterLinkProps {
  className?: string;
  children?: ReactNode;
  isTitle?: boolean;
}

function FooterLink({ children, isTitle }: FooterLinkProps) {
  if (isTitle ?? false) {
    return <div className="footer-link-title">{children}</div>;
  }
  return (
    <Link href="/" className="footer-link">
      {children}
    </Link>
  );
}

export default FooterLink;
