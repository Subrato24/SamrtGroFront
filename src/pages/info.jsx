import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function AboutPage() {
  return (
    <div className="bg-light min-vh-100 py-5 d-flex flex-column">
      <Container>
        {/* Header Section */}
        <Row className="text-center mb-5 px-3">
          <Col>
            <h1 className="fw-bold text-primary display-5 display-md-4">
              🌟 Smart Grocery Application
            </h1>
            <p className="lead text-muted mt-3">
              Your AI-powered grocery companion that helps you save{" "}
              <b>money, time, and effort</b> while shopping.
            </p>
          </Col>
        </Row>

        {/* Feature Cards */}
        <Row className="g-4 px-3">
          <Col xs={12} md={6} lg={4}>
            <Card className="shadow-lg h-100 border-0 rounded-4">
              <Card.Body className="text-center">
                <h3 className="text-success">🛍️ Smart Shop Suggestions</h3>
                <p className="text-muted mt-3">
                  Based on your <b>previous purchases</b>, the app recommends
                  the <b>best shops</b> for your next shopping list. Save time
                  by going directly to the right place!
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4}>
            <Card className="shadow-lg h-100 border-0 rounded-4">
              <Card.Body className="text-center">
                <h3 className="text-warning">📊 Budget Tracking</h3>
                <p className="text-muted mt-3">
                  Stay in control of your spending with{" "}
                  <b>real-time budget insights</b>. The app keeps track of your
                  grocery costs and helps you stick to your budget effortlessly.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4}>
            <Card className="shadow-lg h-100 border-0 rounded-4">
              <Card.Body className="text-center">
                <h3 className="text-primary">📃 Shopping List Management</h3>
                <p className="text-muted mt-3">
                  Easily create and manage shopping lists. The app ensures that
                  every list is optimized for <b>cost-effectiveness</b> and{" "}
                  <b>best shop availability</b>.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Call-to-Action Section */}
        <Row className="text-center mt-5 px-3">
          <Col>
            <h2 className="fw-bold fs-2">Why Choose Smart Grocery?</h2>
            <p className="text-muted fs-6 fs-md-5 mt-2">
              Because it’s more than just a grocery app — it’s your{" "}
              <b>smart shopping partner</b> that saves money and time while
              making your shopping experience smoother.
            </p>
            <Button
              href="/"
              variant="primary"
              size="lg"
              className="rounded-pill shadow-sm mt-3"
            >
              🚀 Start Smart Shopping Today
            </Button>
          </Col>
        </Row>

        {/* Creator Section */}
        <Row className="text-center mt-5 px-3">
          <Col>
            <p className="text-muted mb-0">
              Created with ❤️ by{" "}
              <a
                href="https://subratoghosh.my.canva.site/subrato-ghosh-resume-project"
                target="_blank"
                rel="noopener noreferrer"
                className="fw-bold text-decoration-none text-primary"
              >
                Subrato Ghosh
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AboutPage;
