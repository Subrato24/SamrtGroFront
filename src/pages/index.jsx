import React from "react";
import { Navbar, Nav, Container, Card, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import "bootstrap/dist/css/bootstrap.min.css";

function IndexPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    dispatch(logout());
    navigate("/home");
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #e0f7fa, #fff3e0)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar */}
      <Navbar expand="lg" style={{ background: "linear-gradient(90deg, #667eea, #764ba2)" }} variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/info" className="fw-bold text-white">
            🛒 Smart Grocery
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {!user ? (
                <Nav.Link href="/" className="fw-bold text-white">
                  Login
                </Nav.Link>
              ) : (
                <>
                  <Nav.Link href="/items" className="fw-bold text-white">
                    Items
                  </Nav.Link>
                  <Nav.Link href="/shops" className="fw-bold text-white">
                    Shops
                  </Nav.Link>
                  <Nav.Link href="/ShoppingList" className="fw-bold text-white">
                    My List
                  </Nav.Link>
                  <Nav.Link onClick={handleLogout} className="text-warning fw-bold">
                    Logout
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Welcome Section */}
      <Container className="text-center my-5">
        <h1 className="fw-bold text-primary">Welcome to Smart Grocery</h1>
        <p className="lead mt-3 text-dark">
          Your one-stop solution to manage groceries, track expenses, and find the best shops.
        </p>
        {!user ? (
          <Button variant="success" size="lg" onClick={() => navigate("/")}>
            Get Started
          </Button>
        ) : (
          <Button variant="warning" size="lg" onClick={() => navigate("/items")}>
            Go to Dashboard
          </Button>
        )}
      </Container>

      {/* Features Section */}
      <Container className="my-5">
        <h2 className="text-center mb-4 fw-bold text-secondary">Why Choose Us?</h2>
        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 shadow border-0">
              <Card.Body className="text-center">
                <h3 className="fw-bold text-success">💰 Budget Tracking</h3>
                <p className="mt-3">Monitor and control your grocery expenses effortlessly.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow border-0">
              <Card.Body className="text-center">
                <h3 className="fw-bold text-info">🏪 Shop Suggestions</h3>
                <p className="mt-3">Find the best shops based on your purchase history.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow border-0">
              <Card.Body className="text-center">
                <h3 className="fw-bold text-warning">📝 Easy Lists</h3>
                <p className="mt-3">Create, manage, and check off items on your shopping list.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Call to Action */}
      <Container fluid className="py-5 text-center" style={{ background: "linear-gradient(90deg, #ffecd2, #fcb69f)" }}>
        <h2 className="fw-bold mb-3">Ready to simplify your shopping?</h2>
        <p className="mb-4">Join Smart Grocery today and make shopping stress-free.</p>
        {!user ? (
          <Button variant="primary" size="lg" onClick={() => navigate("/")}>
            Sign Up Now
          </Button>
        ) : (
          <Button variant="dark" size="lg" onClick={() => navigate("/items")}>
            Start Shopping
          </Button>
        )}
      </Container>

      {/* Footer */}
      <footer className="text-center py-4 mt-auto" style={{ background: "#333", color: "#fff" }}>
        <p className="mb-1 fw-bold">Made with ❤️ by Subrato Ghosh</p>
        <a
          href="https://subratoghosh.my.canva.site/subrato-ghosh-resume-project"
          target="_blank"
          rel="noreferrer"
          className="text-decoration-none text-info"
        >
          Learn more about the creator
        </a>
      </footer>
    </div>
  );
}

export default IndexPage;
