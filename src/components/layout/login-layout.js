"use client";

import { Col, Row } from "react-bootstrap";
import Image from "next/image";
const LoginLayout = ({ image, children }) => {
  return (
    <>
      <Row className=" vh-100 align-items-center">
        {/* Form Section */}
        <Col xs={12} md={6} className="">
          <div className="form-container">{children}</div>
        </Col>

        {/* Image Section */}
        <Col xs={12} md={6} className="d-none d-md-block">
          <div className="image-container">
            <Image
              src={image}
              className="w-100"
              alt="Login Side Image"
              priority
              objectFit="contain"
            />
          </div>
        </Col>
      </Row>
    </>
  );
};
export default LoginLayout;
