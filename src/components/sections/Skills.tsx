import { Col, Container, Row } from "react-bootstrap";

import SkillsRow from "../SkillsDisplay";

const SkillsSection = () => {
  return (
    <section id="skills">
      <Container className="justify-content-center bg-dark" fluid>
        <Row>
          <Col>
            <h1 className="display-1 align-self-center text-center title">Skills</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <SkillsRow
              header="Programming Languages"
              skills={[
                { image: "/skills/java.svg", name: "Java" },
                { image: "/skills/csharp.svg", name: "C#" },
                { image: "/skills/typescript.svg", name: "TypeScript" },
                { image: "/skills/python.svg", name: "Python" },
              ]}
            />
          </Col>
          <Col>
            <SkillsRow
              header="Libraries & Frameworks"
              skills={[
                { image: "/skills/dotnet-core.svg", name: ".NET Core" },
                { image: "/skills/nodejs.svg", name: "Node.js" },
                { image: "/skills/react.svg", name: "React" },
                { image: "/skills/angular.svg", name: "Angular" },
              ]}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <SkillsRow
              header="Databases"
              skills={[
                { image: "/skills/mysql.svg", name: "MySQL" },
                {
                  image: "/skills/postgres.svg",
                  name: "PostgreSQL",
                },
              ]}
            />
          </Col>
          <Col>
            <SkillsRow header="Platforms" skills={[{ image: "/skills/aws.svg", name: "Amazon Web Services" }]} />
          </Col>
        </Row>
        <Row>
          <Col>
            <SkillsRow
              header="Tools"
              skills={[
                { image: "/skills/git.svg", name: "Git" },
                { image: "/skills/docker.svg", name: "Docker" },
                { image: "/skills/linux.svg", name: "Linux" },
                { image: "/skills/jira.svg", name: "Jira" },
              ]}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SkillsSection;
