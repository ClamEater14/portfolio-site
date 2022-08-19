import { Container, Nav, Navbar, NavLink } from 'react-bootstrap';
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

function Header() {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Brand as={Link} to="/">
          <img
            src="/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Caleb Lam logo"
          />
        </Navbar.Brand>
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            {LINKS.map((navLinkInfo) => (
              <Nav.Link as={Link} to={navLinkInfo.to}>
                {navLinkInfo.linkText}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
