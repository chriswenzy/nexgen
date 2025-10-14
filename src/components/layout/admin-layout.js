"use client";
import { useState } from "react";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import Sidebar from "../sidebar/Sidebar";
import {
  FaChartBar,
  FaPaintBrush,
  FaBoxOpen,
  FaUsers,
  FaBlog,
} from "react-icons/fa";
export default function AdminLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="admin-layout">
      {/* Top Navigation */}
      <Navbar bg="white" expand="lg" className="border-bottom shadow-sm">
        <Container fluid>
          <Navbar.Brand href="/admin" className="fw-bold text-primary">
            🎨 Nexgen Admin
          </Navbar.Brand>

          <Nav className="ms-auto">
            <Nav.Link href="#notifications" className="position-relative">
              🔔{" "}
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
              </span>
            </Nav.Link>
            <Nav.Link href="#profile">👤 Admin User</Nav.Link>
            <Nav.Link href="/">← Back to Store</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col
            xs={12}
            md={3}
            lg={2}
            className={`sidebar-col ${sidebarCollapsed ? "collapsed" : ""}`}
          >
            <Sidebar
              collapsed={sidebarCollapsed}
              onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            />
          </Col>

          {/* Main Content */}
          <Col xs={12} md={9} lg={10} className="main-content">
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
