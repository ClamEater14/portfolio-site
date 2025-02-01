import { forwardRef } from "react";
import { Container, Stack } from "react-bootstrap";

import * as Icons from "./Icons";
import IconLink from "./Link/IconLink";

const Footer = forwardRef<HTMLElement>((_props, ref) => {
  return (
    <footer ref={ref}>
      <Container fluid className="bg-dark p-1 100-vw">
        <p className="text-center m-2">&copy; 2025 Caleb Lam</p>
        <Stack direction="horizontal" gap={3} className="justify-content-center align-self-center m-2">
          <IconLink
            className="align-self-center"
            ariaLabel="View my LinkedIn profile"
            href="https://linkedin.com/in/caleblam14"
            rel="noopener noreferrer"
            target="_blank"
            icon={Icons.LinkedIn}
            iconSize={24}
            enlargeOnHover={false}
          />
          <IconLink
            className="align-self-center"
            ariaLabel="View my GitHub profile"
            href="https://github.com/clameater14"
            rel="noopener noreferrer"
            target="_blank"
            icon={Icons.GitHub}
            iconSize={24}
            enlargeOnHover={false}
          />
          <IconLink
            className="align-self-center"
            ariaLabel="Contact me via email"
            href="mailto:caleb@caleblamcodes.dev"
            rel="noopener noreferrer"
            target="_blank"
            icon={Icons.EnvelopeFill}
            iconSize={24}
            enlargeOnHover={false}
          />
        </Stack>
      </Container>
    </footer>
  );
});

Footer.displayName = "Footer";
export default Footer;
