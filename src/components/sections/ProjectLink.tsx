import Link from "next/link";
import { motion } from "motion/react";
import { Col, Container, Row } from "react-bootstrap";

import * as Icons from "../Icons";

import "./index.scss";

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
                  <motion.button
                    initial={{ scale: 1, backgroundColor: "#007bff" }}
                    whileHover={{ scale: 1.1, backgroundColor: "#004186" }}
                    transition={{ duration: 0.2, type: "spring", stiffness: 250 }}
                    style={{
                      borderRadius: "64px",
                    }}
                    className="btn btn-lg"
                  >
                    <span className="display-2 m-3 d-flex align-items-center">
                      <Icons.Folder size={128} />
                      <span className="ms-4 display-1 subtitle">View Projects</span>
                    </span>
                  </motion.button>
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
