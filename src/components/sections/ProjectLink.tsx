import Link from "next/link";
import { motion } from "motion/react";
import { Col, Container, Row } from "react-bootstrap";

const ProjectLinkSection = () => {
  return (
    <section id="projects">
      <Container className="justify-content-center" fluid>
        <Row>
          <Col>
            <h1 className="display-1 align-self-center text-center title">Projects</h1>
          </Col>
        </Row>
        <Row>
          <Col className="m-5">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Container className="d-flex justify-content-center">
                <Link href="/projects">
                  {/* TODO: use React-Bootstrap's button */}
                  <button className="btn btn-primary">
                    <span className="display-2">
                      <b>\uD83D\uDCC1 View Projects</b>
                    </span>
                  </button>
                </Link>
              </Container>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProjectLinkSection;
