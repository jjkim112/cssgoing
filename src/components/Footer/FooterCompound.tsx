import React from "react";
import "./FooterStyles.css";
import FooterLink from "./FooterLink";
import Image from "next/image";

function FooterCompound() {
  return (
    <footer className="footer-wrapper inner">
      <div className="footer-title">
        <Image
          className="logo"
          src={`/images/logo2.png`}
          width={500}
          height={100}
          alt=""
        />
        <div className="mt-3">
          Link3 is a Web3 native social platform built on CyberConnect protocol.
        </div>
      </div>
      <div className="footer-row">
        <div className="footer-column">
          <FooterLink isTitle={true}>My Account</FooterLink>
          <FooterLink>Profile</FooterLink>
          <FooterLink>My W3ST</FooterLink>
          <FooterLink>Settings</FooterLink>
        </div>
        <div className="footer-column">
          <FooterLink isTitle={true}>Resources</FooterLink>
          <FooterLink>Branding</FooterLink>
          <FooterLink>Discord</FooterLink>
          <FooterLink>Twitter</FooterLink>
        </div>
        <div className="footer-column">
          <FooterLink isTitle={true}>Company</FooterLink>
          <FooterLink>CyberConnect</FooterLink>
          <FooterLink>Why Link3</FooterLink>
          <FooterLink>User Guide</FooterLink>
          <FooterLink>Handbook for Org</FooterLink>
        </div>
        <div className="footer-column">
          <FooterLink isTitle={true}>Contact</FooterLink>
          <FooterLink>Mail</FooterLink>
          <FooterLink>Phone</FooterLink>
        </div>
      </div>
    </footer>
  );
}

export default FooterCompound;
