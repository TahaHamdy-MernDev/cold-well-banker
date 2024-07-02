import React, { useState } from 'react';
import { Container, Navbar, Button, Row, Col, Offcanvas, Nav, Accordion } from 'react-bootstrap';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Toaster from '../components/Toaster';

function Sidebar({ onLinkClick }) {
  const location = useLocation();

  const links = {
    "Area Management": [
      { to: "create-area", label: "Create Area" },
      { to: "show-all-areas", label: "Show All Areas" },
    ],
    "Developer Management": [
      { to: "create-developer", label: "Create Developer" },
      { to: "show-all-developers", label: "Show All Developers" },
    ],
    "Compound Management": [
      { to: "create-compound", label: "Create Compound" },
      { to: "show-all-compounds", label: "Show All Compounds" },
    ],
    "Type Management": [
      { to: "create-type", label: "Create Type" },
      { to: "show-all-types", label: "Show All Types" },
    ],
    "Property Management": [
      { to: "create-property", label: "Create Property" },
    ],
    "Launch Management": [
      { to: "create-launch", label: "Create Launch" },
      { to: "show-all-launches", label: "Show All Launches" },
    ],
    "Requests Management": [
      { to: "academy-requests", label: "Academy Requests" },
      { to: "contact-requests", label: "Contact Requests" },
      { to: "sell-requests", label: "Sell Property Requests" },
      { to: "property-requests", label: "Property Contact Requests" },
    ],
  };

  const renderLinks = (links) => (
    links.map(link => (
      <Link
        key={link.to}
        to={link.to}
        className={`nav-link p-0 py-2 ${location.pathname === `/${link.to}` ? 'active' : ''}`}
        onClick={onLinkClick}
      >
        {link.label}
      </Link>
    ))
  );

  const getActiveKey = () => {
    const activePath = location.pathname.replace('/', '');
    return Object.entries(links).find(([key, value]) => value.some(link => link.to === activePath))?.[0] || '';
  };

  return (
    <Nav className="flex-column pt-2 h-100">
      <Accordion defaultActiveKey={getActiveKey()}>
        {Object.entries(links).map(([header, linkArray]) => (
          <Accordion.Item eventKey={header} key={header}>
            <Accordion.Header>{header}</Accordion.Header>
            <Accordion.Body>
              {renderLinks(linkArray)}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Nav>
  );
}

export default function MainLayout() {
  const [showSidebar, setShowSidebar] = useState(false);
  const handleSidebarToggle = () => setShowSidebar(!showSidebar);

  return (
    <React.Fragment>
      <Navbar bg="dark" variant="dark" expand="lg" className="w-100 position-fixed top-0 shadow">
        <Container fluid>
          <Navbar.Brand href="/">Dashboard</Navbar.Brand>
          <Button variant="outline-light" className="d-lg-none" onClick={handleSidebarToggle}>
            <i className="bi bi-list"></i>
          </Button>
        </Container>
      </Navbar>

      <Row className="g-0 min-vh-100 position-relative" style={{marginTop:"3rem"}}>
        <Col lg={2} className="d-none d-lg-block bg-light sidebar position-fixed h-100">
          <Sidebar />
        </Col>
        <Col lg={{ span: 10, offset: 2 }} className="main-content">
          <Container fluid>
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

      <Toaster />
    </React.Fragment>
  );
}
