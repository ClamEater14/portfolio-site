import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Col, Container, Row, Stack } from "react-bootstrap";

interface Skill {
  name: string;
  image: string;
}

interface SkillsRowProps {
  header?: string;
  skills: Skill[];
}

const SkillsRow: React.FC<SkillsRowProps> = ({ header, skills }) => {
  return (
    <Container fluid>
      {header ? (
        <Row className="justify-content-center">
          <Col>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.25 }}
            >
              <h2 className="display-2 align-self-center text-center">{header}</h2>
            </motion.div>
          </Col>
        </Row>
      ) : null}
      <Row className="justify-content-center">
        <Col>
          <Stack direction="horizontal" gap={3} className="flex-wrap justify-content-center m-1">
            {skills.map((skill, index) => (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.25 + 0.2 * index }}
                key={index}
                className="d-flex flex-column align-items-center mb-2"
              >
                <div
                  style={{
                    width: `${64}px`,
                    height: `${64}px`,
                    position: "relative",
                  }}
                >
                  <Image src={skill.image} alt={skill.name} fill className="object-fit-contain skill-image" />
                </div>
                <h2 className="mt-auto">{skill.name}</h2>
              </motion.div>
            ))}
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default SkillsRow;
