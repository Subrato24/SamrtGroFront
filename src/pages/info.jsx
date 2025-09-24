import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function AboutPage() {
  return (
    <div className="bg-light min-vh-100 py-5">
      <Container>
        {/* Header Section */}
        <Row className="text-center mb-5">
          <Col>
            <h1 className="display-4 fw-bold text-primary">
              🌟 Smart Grocery Application
            </h1>
            <p className="lead text-muted">
              Your AI-powered grocery companion that helps you save money, time,
              and effort while shopping.
            </p>
          </Col>
        </Row>

        {/* Feature Cards */}
        <Row className="g-4">
          <Col md={4}>
            <Card className="shadow-lg h-100 border-0 rounded-4">
              <Card.Body className="text-center">
                <h3 className="text-success">🛍️ Smart Shop Suggestions</h3>
                <p className="text-muted">
                  Based on your <b>previous purchases</b>, the app recommends
                  the <b>best shops</b> for your next shopping list. Save time
                  by going directly to the right place!
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow-lg h-100 border-0 rounded-4">
              <Card.Body className="text-center">
                <h3 className="text-warning">📊 Budget Tracking</h3>
                <p className="text-muted">
                  Stay in control of your spending with <b>real-time budget
                  insights</b>. The app keeps track of your grocery costs and
                  helps you stick to your budget effortlessly.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow-lg h-100 border-0 rounded-4">
              <Card.Body className="text-center">
                <h3 className="text-primary">📃 Shopping List Management</h3>
                <p className="text-muted">
                  Easily create and manage shopping lists. The app ensures that
                  every list is optimized for <b>cost-effectiveness</b> and{" "}
                  <b>best shop availability</b>.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Call-to-Action Section */}
        <Row className="text-center mt-5">
          <Col>
            <h2 className="fw-bold">Why Choose Smart Grocery?</h2>
            <p className="text-muted fs-5">
              Because it’s more than just a grocery app — it’s your{" "}
              <b>smart shopping partner</b> that saves money and time while
              making your shopping experience smoother.
            </p>
            <Button
              href="/"
              variant="primary"
              size="lg"
              className="rounded-pill shadow-sm"
            >
              🚀 Start Smart Shopping Today
            </Button>
          </Col>
        </Row>

        {/* Creator Section */}
        <Row className="text-center mt-5">
          <Col>
            <p className="text-muted">
              Created with ❤️ by{" "}
              <a
                href="https://l.instagram.com/?u=https%3A%2F%2Fsubratoghosh.my.canva.site%2Fsubrato-ghosh-resume-project%3Ffbclid%3DPAZXh0bgNhZW0CMTEAAadkKt3TBcpq-rvAWzjp6R3q5VJwg1l6qYhfYfoQGKnAElna48aZCISYY1Tusg_aem_UN6g7b0KByFg28wXQcmxYw&e=AT3m7Mu-aohRiP5w4icwMNFKqMmFx-f9BfI8kgVZSHBuU-WG_PhAHnj6zMIVUTC4or5HrxdpcmnzAJznxTrCrX5meCkJN0Now_Z6VIeW-iw_caYP-6hCap-2nQ"
                target="_blank"
                rel="noopener noreferrer"
                className="fw-bold text-decoration-none"
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
