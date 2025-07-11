import React from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";

import teamImage from "assets/images/auth/team-collaboration.jpg";
import withRouter from "Common/withRouter";

const ParticlesAuth = ({ children }: any) => {
  return (
    <React.Fragment>
      <div className="auth-page-wrapper py-5 position-relative d-flex align-items-center justify-content-center min-vh-100">
        <Container>
          <Row className="justify-content-center">
            <Col lg={11}>
              <Card className="mb-0">
                <Row className="g-0 align-items-center">
                  <Col xxl={5}>
                    <Card className="auth-card bg-primary h-100 border-0 shadow-none d-none d-sm-block mb-0">
                      <Card.Body className="py-5 d-flex justify-content-between flex-column h-100">
                        <div className="text-center">
                          <h3 className="text-white mb-3">
                            Start your journey with us.
                          </h3>
                          <p className="text-white opacity-75 fs-base mb-0">
                            It brings together your tasks, projects, timelines,
                            files and more
                          </p>
                        </div>

                        <div className="text-center my-5">
                          <div
                            className="auth-image-container mx-auto"
                            style={{ maxWidth: "400px" }}
                          >
                            <Image
                              src={teamImage}
                              alt="Team collaboration"
                              className="img-fluid rounded-3 shadow-lg"
                              style={{
                                width: "100%",
                                height: "auto",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  {/* Pass Children */}
                  {children}
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(ParticlesAuth);
