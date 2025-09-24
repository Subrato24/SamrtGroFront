import React from "react";
import { Carousel, Navbar, Nav, Container, Card, Row, Col } from "react-bootstrap";
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
      {/* Navbar with gradient */}
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

      {/* Full Screen Carousel */}
      <Carousel fade interval={3000}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="src/resources/wallpapers/W1.jpg"
            alt="First slide"
            style={{ height: "100vh", objectFit: "cover" }}
          />
          <Carousel.Caption
            style={{
              background: "rgba(0,0,0,0.5)",
              borderRadius: "12px",
              padding: "15px",
            }}
          >
            <h3 className="fw-bold text-warning">Fresh Groceries</h3>
            <p>Get the best deals on your daily essentials.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="src/resources/wallpapers/W2.jpg"
            alt="Second slide"
            style={{ height: "100vh", objectFit: "cover" }}
          />
          <Carousel.Caption
            style={{
              background: "rgba(0,0,0,0.5)",
              borderRadius: "12px",
              padding: "15px",
            }}
          >
            <h3 className="fw-bold text-info">Best Shops Around You</h3>
            <p>Choose your favorite shop and save more.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="src/resources/wallpapers/W3.jpg"
            alt="Third slide"
            style={{ height: "100vh", objectFit: "cover" }}
          />
          <Carousel.Caption
            style={{
              background: "rgba(0,0,0,0.5)",
              borderRadius: "12px",
              padding: "15px",
            }}
          >
            <h3 className="fw-bold text-success">Easy Shopping Experience</h3>
            <p>Track, compare, and plan your grocery list.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Feature Highlights Section */}
      <Container className="my-5">
        <h2 className="text-center fw-bold mb-4 text-primary">Why Smart Grocery? 🤔</h2>
        <Row className="g-4">
          <Col md={4}>
            <Card className="shadow border-0 h-100 text-center">
              <Card.Body>
                <h4 className="fw-bold text-success">💰 Budget Tracking</h4>
                <p>Easily monitor your expenses and stay within your budget.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow border-0 h-100 text-center">
              <Card.Body>
                <h4 className="fw-bold text-info">🏪 Shop Suggestions</h4>
                <p>Get the best shop recommendations based on your past purchases.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow border-0 h-100 text-center">
              <Card.Body>
                <h4 className="fw-bold text-warning">📝 Easy Lists</h4>
                <p>Create, edit, and manage your grocery lists seamlessly.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="text-center py-4 mt-5" style={{ background: "#f8f9fa" }}>
        <p className="mb-1 fw-bold">Made with ❤️ by Subrato Ghosh</p>
        <a href="https://l.instagram.com/?u=https%3A%2F%2Fsubratoghosh.my.canva.site%2Fsubrato-ghosh-resume-project%3Ffbclid%3DPAZXh0bgNhZW0CMTEAAadkKt3TBcpq-rvAWzjp6R3q5VJwg1l6qYhfYfoQGKnAElna48aZCISYY1Tusg_aem_UN6g7b0KByFg28wXQcmxYw&e=AT3m7Mu-aohRiP5w4icwMNFKqMmFx-f9BfI8kgVZSHBuU-WG_PhAHnj6zMIVUTC4or5HrxdpcmnzAJznxTrCrX5meCkJN0Now_Z6VIeW-iw_caYP-6hCap-2nQ" className="text-decoration-none text-primary">
          Learn more about the creator
        </a>
      </footer>
    </>
  );
}

export default IndexPage;
