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
    <>
      {/* Navbar */}
      <Navbar expand="lg" sticky="top" style={{ background: "linear-gradient(90deg, #667eea, #764ba2)" }}>
        <Container>
          <Navbar.Brand href="/info" className="fw-bold text-white">
            🛒 Smart Grocery
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {!user ? (
                <Nav.Link href="/" className="text-white fw-bold">
                  Login
                </Nav.Link>
              ) : (
                <>
                  <Nav.Link href="/items" className="text-white fw-bold">
                    Items
                  </Nav.Link>
                  <Nav.Link href="/shops" className="text-white fw-bold">
                    Shops
                  </Nav.Link>
                  <Nav.Link href="/ShoppingList" className="text-white fw-bold">
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

      {/* Hero Section */}
      <section
        style={{
          background: "url('https://images.unsplash.com/photo-1542834369-f10ebf06d3cb?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat",
          color: "white",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Container>
          <h1 className="fw-bold display-4">Shop Smarter, Live Better 🌱</h1>
          <p className="lead mt-3 mb-4">
            Track expenses, get shop recommendations, and manage your grocery lists in one place.
          </p>
          {!user ? (
            <Button variant="warning" size="lg" onClick={() => navigate("/")}>
              Get Started
            </Button>
          ) : (
            <Button variant="success" size="lg" onClick={() => navigate("/items")}>
              Go to Dashboard
            </Button>
          )}
        </Container>
      </section>

      {/* Features Section */}
      <Container className="my-5">
        <h2 className="text-center fw-bold mb-5 text-primary">Why Choose Smart Grocery?</h2>
        <Row className="g-4">
          <Col md={4}>
            <Card className="shadow border-0 h-100 text-center p-3">
              <Card.Body>
                <h4 className="fw-bold text-success">💰 Budget Tracking</h4>
                <p>Easily monitor your expenses and stay within your budget with real-time insights.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow border-0 h-100 text-center p-3">
              <Card.Body>
                <h4 className="fw-bold text-info">🏪 Shop Suggestions</h4>
                <p>Get the best shop recommendations based on your past purchases and preferences.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow border-0 h-100 text-center p-3">
              <Card.Body>
                <h4 className="fw-bold text-warning">📝 Easy Lists</h4>
                <p>Create, edit, and manage your grocery lists seamlessly from any device.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Call to Action */}
      <section className="text-center py-5" style={{ background: "linear-gradient(90deg, #667eea, #764ba2)", color: "white" }}>
        <h2 className="fw-bold">Ready to Make Grocery Shopping Easy?</h2>
        <p className="mb-4">Join Smart Grocery today and simplify your life.</p>
        {!user ? (
          <Button variant="light" size="lg" onClick={() => navigate("/")}>
            Sign Up Now
          </Button>
        ) : (
          <Button variant="dark" size="lg" onClick={() => navigate("/items")}>
            Start Shopping
          </Button>
        )}
      </section>

      {/* Footer */}
      <footer className="text-center py-4" style={{ background: "#f8f9fa" }}>
        <p className="mb-1 fw-bold">Made with ❤️ by Subrato Ghosh</p>
        <a
          href="https://subratoghosh.my.canva.site/subrato-ghosh-resume-project"
          target="_blank"
          rel="noreferrer"
          className="text-decoration-none text-primary"
        >
          Learn more about the creator
        </a>
      </footer>
    </>
  );
}

export default IndexPage;
