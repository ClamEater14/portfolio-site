import React from "react";
import { Metadata } from "next";
import { Col, Container, Row } from "react-bootstrap";

import AnimatedLink from "../components/Link";

export const metadata: Metadata = {
  title: "Uh Oh... (404)",
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const Error = () => {
  return (
    <>
      <Container
        className="justify-content-center d-flex flex-column text-center vh-100 offset-header offset-footer"
        fluid
      >
        <Row className="align-self-center">
          <Col className="align-self-center">
            <h1 className="display-1 align-self-center title m-0">404</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>You seem lost and confused...</h2>
            <AnimatedLink enlargeOnHover={false} href="/">
              <u>Let&apos;s go back Home!</u>
            </AnimatedLink>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Error;
