import { Container, Stack } from "react-bootstrap";
import { Icons } from "./Icons";
import { forwardRef } from "react";

const Footer = forwardRef<HTMLElement>((_props, ref) => {
  return (
    <footer ref={ref} className="position-absolute w-100 bottom-0">
      <Container fluid className="bg-dark p-1">
        <p className="text-center m-2">&copy; 2022 Caleb Lam</p>
        <Stack
          direction="horizontal"
          gap={3}
          className="justify-content-center align-self-center m-2"
        >
          <a
            className="align-self-center"
            href="https://linkedin.com/in/caleblam14"
            rel="noopener noreferrer"
            target="_blank"
            color="#FFFFFF"
          >
            <Icons.LinkedIn size={24} />
          </a>
          <a
            className="align-self-center"
            href="https://github.com/clameater14"
            rel="noopener noreferrer"
            target="_blank"
            color="#FFFFFF"
          >
            <Icons.GitHub size={24} />
          </a>
          <a
            className="align-self-center"
            href="mailto:caleb@caleblamcodes.dev"
            rel="noopener noreferrer"
            target="_blank"
            color="#FFFFFF"
          >
            <Icons.EnvelopeFill size={24} />
          </a>
        </Stack>
      </Container>
    </footer>
  );
});

Footer.displayName = "Footer";
export default Footer;
