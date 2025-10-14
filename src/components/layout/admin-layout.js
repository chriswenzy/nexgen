"use client";
import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Badge,
  Dropdown,
} from "react-bootstrap";
import Sidebar from "../sidebar/Sidebar";
import {
  FaBell,
  FaUserCircle,
  FaStore,
  FaChevronDown,
  FaBars,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import "./AdminLayout.css";

export default function AdminLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`admin-layout ${darkMode ? "dark-mode" : "light-mode"}`}>
      {/* Top Navigation */}
      <Navbar expand="lg" className="admin-navbar">
        <Container fluid>
          <div className="d-flex align-items-center">
            <button
              className="sidebar-toggle btn btn-link text-decoration-none me-3"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <FaBars className="icon" />
            </button>
            <Navbar.Brand href="/admin" className="fw-bold brand-logo">
              <div className="brand-icon">🎨</div>
              <span className="brand-text">Nexgen Admin</span>
            </Navbar.Brand>
          </div>

          <Nav className="ms-auto align-items-center">
            {/* Dark Mode Toggle */}
            <button
              className="theme-toggle btn btn-link text-decoration-none me-2"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? (
                <FaSun className="icon" />
              ) : (
                <FaMoon className="icon" />
              )}
            </button>

            {/* Notifications */}
            <Dropdown align="end" className="me-3">
              <Dropdown.Toggle
                as={Nav.Link}
                className="position-relative notification-toggle"
              >
                <FaBell className="icon" />
                <Badge bg="danger" className="notification-badge">
                  3
                </Badge>
              </Dropdown.Toggle>
              <Dropdown.Menu className="notification-dropdown">
                <Dropdown.Header>Notifications</Dropdown.Header>
                <Dropdown.Item className="notification-item">
                  <div className="notification-content">
                    <div className="notification-title">New order received</div>
                    <div className="notification-time">2 min ago</div>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item className="notification-item">
                  <div className="notification-content">
                    <div className="notification-title">Product low stock</div>
                    <div className="notification-time">1 hour ago</div>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item className="notification-item">
                  <div className="notification-content">
                    <div className="notification-title">
                      New user registered
                    </div>
                    <div className="notification-time">3 hours ago</div>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="text-center text-primary view-all-notifications">
                  View all
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* User Profile */}
            <Dropdown align="end">
              <Dropdown.Toggle as={Nav.Link} className="user-profile-toggle">
                <div className="user-avatar">
                  <FaUserCircle className="avatar-icon" />
                </div>
                <div className="user-info">
                  <div className="user-name">Admin User</div>
                  <div className="user-role">Administrator</div>
                </div>
                <FaChevronDown className="dropdown-arrow" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="profile-dropdown">
                <Dropdown.Item className="profile-dropdown-item">
                  <FaUserCircle className="me-2" />
                  My Profile
                </Dropdown.Item>
                <Dropdown.Item className="profile-dropdown-item">
                  <FaStore className="me-2" />
                  Analytics
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  href="/"
                  className="store-link profile-dropdown-item"
                >
                  <FaStore className="me-2" />
                  Back to Store
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>

      <Container fluid className="admin-container">
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
            <div className="content-wrapper">{children}</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
