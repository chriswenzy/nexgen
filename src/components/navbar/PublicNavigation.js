"use client";
import { Badge, Button, Container, Nav, Navbar } from "react-bootstrap";
import logo from "../../assets/nexgen-logo.svg";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/util/data";
import { BsArrowRight } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";

const PublicNavigationBar = () => {
  const pathname = usePathname(); // Correct way to get current route in App Router

  return (
    <Navbar expand="lg" sticky="top" className="bg-white shadow-sm py-3">
      <Container>
        {/* Brand Logo */}
        <Navbar.Brand href="/" className="me-5">
          <Image
            src={logo}
            className="img-fluid"
            width={140}
            alt="Nextgen logo"
          />
        </Navbar.Brand>

        {/* Mobile Toggle */}
        <Navbar.Toggle
          aria-controls="main-navbar"
          className="border-0 py-2 px-3"
        >
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>

        {/* Navbar Content */}
        <Navbar.Collapse id="main-navbar">
          {/* Navigation Links */}
          <Nav as="ul" className="mx-auto gap-lg-4">
            {navItems.map((item) => (
              <Nav.Item as="li" key={item.path}>
                <Link
                  href={item.path}
                  className={`nav-link position-relative ${
                    (item.matchExact && pathname === item.path) ||
                    (item.matchStartsWith && pathname.startsWith(item.path))
                      ? "active text-primary fw-medium"
                      : "text-dark hover-primary"
                  }`}
                >
                  {item.name}
                  <span className="active-indicator"></span>
                </Link>
              </Nav.Item>
            ))}
          </Nav>

          {/* CTA Button */}
          <div className="d-flex">
            <Link href="/cart">
              <div className=" position-relative">
                <FaShoppingCart className="" />

                <span className="position-absolute top-0 start-100 translate-end badge rounded-pill bg-danger">
                  30
                </span>
              </div>
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PublicNavigationBar;
