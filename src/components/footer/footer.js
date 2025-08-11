import { Col, Container, Row } from "react-bootstrap";
import logo from "../../assets/nexgen-logo-trans.svg";
import Image from "next/image";
import {
  bottomLinks,
  companyInfo,
  contactInfo,
  footerLinks,
} from "@/util/data";
import { FloatingWhatsApp } from "react-floating-whatsapp";

function PublicFooter() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <FloatingWhatsApp
        phoneNumber="2349067966435"
        accountName="Nexgen Paint Support"
        chatMessage="🎨 Welcome to Nexgen Paint.  
We’re here to help you choose the perfect colors."
        avatar="../../assets/nexgen-logo-trans.svg"
        // allowEsc
        // allowClickAway
        // notification
        // notificationSound
        // className="whatsapp-float"
      />

      <Container>
        {/* Main Footer Content */}
        <Row className="g-4 mb-4">
          {/* Brand Column */}
          <Col lg={4} className="pe-lg-5">
            <div className="mb-4">
              <Image
                src={logo}
                className="img-fluid"
                width={130}
                alt="Nexgen Paint"
              />
            </div>
            <p className="text-light lh-lg mb-4">{companyInfo.description}</p>
            <div className="d-flex gap-3">
              {companyInfo.socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="text-white opacity-75 hover-opacity-100 transition"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </Col>

          {/* Links Columns */}
          {footerLinks.map((section, index) => (
            <Col md={4} lg={2} key={index}>
              <h6 className="text-uppercase fw-bold mb-4">{section.title}</h6>
              <ul className="list-unstyled">
                {section.links.map((link, linkIndex) => (
                  <li className="mb-2" key={linkIndex}>
                    <a
                      href={link.url}
                      className="text-light hover-dark transition"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </Col>
          ))}

          {/* Contact Column */}
          <Col lg={2}>
            <h6 className="text-uppercase fw-bold mb-4">{contactInfo.title}</h6>
            <address className="text-muted small">
              {contactInfo.details.map((detail, index) => (
                <div key={index} className="mb-2 text-white">
                  {detail}
                </div>
              ))}
            </address>
          </Col>
        </Row>

        {/* Divider */}
        <hr className="border-secondary my-4" />

        {/* Copyright Section */}
        <Row className="align-items-center">
          <Col md={6} className="mb-3 mb-md-0">
            <p className="small text-light mb-0">
              © {new Date().getFullYear()} Nexgen Paint Industries. All rights
              reserved.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <div className="d-flex gap-3 justify-content-md-end">
              {bottomLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-muted small hover-white transition"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
export default PublicFooter;
