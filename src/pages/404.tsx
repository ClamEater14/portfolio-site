import { Col, Container, Row } from "react-bootstrap";
import { useViewContext } from "../context/ViewContext";
import Link from "next/link";
import { NextSeo } from "next-seo";

const Error = () => {
  const { headerOffset, footerOffset } = useViewContext();
  return (
    <>
      <NextSeo title="Uh Oh... (404)" noindex nofollow />
      <Container
        className="justify-content-center d-flex flex-column text-center"
        style={{
          height: "100vh",
          marginTop: `-${headerOffset}px`,
          marginBottom: `-${footerOffset}px`,
        }}
        fluid
      >
        <Row className="align-self-center">
          <Col className="align-self-center">
            <h1 className="display-1 align-self-center title m-0">404</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>You seem lost and confused...</p>
            <Link href="/">
              <u>Let&apos;s go back Home!</u>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Error;
