import React, { useState } from 'react';
import { Container, Navbar, Button, Row, Col, Offcanvas, Nav } from 'react-bootstrap';
import { Link, Outlet, useLocation } from 'react-router-dom';

function Sidebar({ onLinkClick }) {
  const location = useLocation();

  const links = [
    { to: "", label: "Home" },
    { to: "create-area", label: "Create Area" },
    // { to: "update-area", label: "Update Area" },
    // { to: "show-all-areas", label: "Show All Areas" },
   
    { to: "create-developer", label: "Create Developer" },
    // { to: "update-developer", label: "Update Developer" },
    // { to: "show-all-developers", label: "Show All Developers" },
    { to: "create-compound", label: "Create Compound" },
    // { to: "update-compound", label: "Update Compound" },
    // { to: "show-all-compounds", label: "Show All Compounds" },
    { to: "create-type", label: "Create Type" },
    // { to: "update-type", label: "Update Type" },
    // { to: "show-all-types", label: "Show All Types" },
    { to: "create-property", label: "Create Property" },
    // { to: "update-property", label: "Update Property" },
    // { to: "show-all-properties", label: "Show All Properties" },
    { to: "create-launch", label: "Create Launch" },
    // { to: "update-property", label: "Update Property" },
    // { to: "show-all-properties", label: "Show All Properties" },
  ];

  return (
    <Nav className="flex-column p-2">
      {links.map(link => (
        <Link
          key={link.to}
          to={link.to}
          className={`nav-link ${location.pathname === `/${link.to}` ? 'active' : ''}`}
          onClick={onLinkClick}
        >
          {link.label}
        </Link>
      ))}
    </Nav>
  );
}

export default function MainLayout() {
  const [showSidebar, setShowSidebar] = useState(false);
  const handleSidebarToggle = () => setShowSidebar(!showSidebar);

  return (
    <React.Fragment>
      <Navbar bg="dark" variant="dark" expand="lg" className="w-100 position-fixed top-0 shadow">
        <Container>
          <Navbar.Brand href="/">Dashboard</Navbar.Brand>
          <Button variant="outline-light" className="d-lg-none" onClick={handleSidebarToggle}>
            <i className="bi bi-list"></i>
          </Button>
        </Container>
      </Navbar>

      <Row className="w-100">
        <Col md={2} className="bg-white sidebar d-none d-lg-block shadow">
          <Sidebar />
        </Col>
        <Col md={10} className="main-content">
          <Container className=" my-4 p-2 bg-white shadow rounded-2">
          <Outlet />
          </Container>
        </Col>
      </Row>

      <Offcanvas show={showSidebar} onHide={handleSidebarToggle} className="d-lg-none">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Sidebar onLinkClick={handleSidebarToggle} />
        </Offcanvas.Body>
      </Offcanvas>
    </React.Fragment>
  );
}
