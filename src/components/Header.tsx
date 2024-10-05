import Image from "next/image";
import Link from "next/link";
import { forwardRef } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { AppConfig } from "../config/AppConfig";

interface NavLinkInfo {
  linkText: string;
  to: string;
}

const LINKS: NavLinkInfo[] = [
  {
    linkText: "Home",
    to: "/",
  },
  {
    linkText: "Projects",
    to: "/projects",
  },
];

const Header = forwardRef<HTMLElement>((_props, ref) => {
  return (
    <Navbar ref={ref} bg="dark" sticky="top" collapseOnSelect>
      <Container>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Brand as={Link} href="/">
          <Image
            src={AppConfig.logoURL}
            priority
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="Caleb Lam logo"
          />
        </Navbar.Brand>
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            {LINKS.map((navLinkInfo, index) => (
              <Nav.Link key={index} as={Link} href={navLinkInfo.to}>
                {navLinkInfo.linkText}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

Header.displayName = "Header";
export default Header;
