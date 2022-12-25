import { NextPage } from "next";
import { Col, Container, Row } from "react-bootstrap";
import { useViewContext } from "../context/ViewContext";
import Link from "next/link";
import Head from "next/head";

interface ErrorProps {
  statusCode?: number;
}

const Error: NextPage = ({ statusCode }: ErrorProps) => {
  const { headerOffset, footerOffset } = useViewContext();
  return (
    <>
      <Head>
        <title>Uh oh...</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
      </Head>
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
            <h1 className="display-1 align-self-center title m-0">
              {statusCode}
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Ouch! Looks like something bad happened here...</p>
            <Link href="/">
              <u>Let&apos;s go back Home!</u>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
