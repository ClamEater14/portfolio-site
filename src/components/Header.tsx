import { forwardRef } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, To } from 'react-router-dom';

interface NavLinkInfo {
  linkText: string;
  to: To;
}

const LINKS: NavLinkInfo[] = [
  {
    linkText: 'Home',
    to: '/',
  },
  {
    linkText: 'Projects',
    to: '/projects',
  },
];

const Header = forwardRef<HTMLElement>((_props, ref) => {
  return (
    <Navbar ref={ref} variant="dark" bg="none" sticky="top" collapseOnSelect>
      <Container>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Brand as={Link} to="/">
          <img
            src="/logo.svg"
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="Caleb Lam logo"
          />
        </Navbar.Brand>
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            {LINKS.map((navLinkInfo, index) => (
              <Nav.Link key={index} as={Link} to={navLinkInfo.to}>
                {navLinkInfo.linkText}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default Header;
