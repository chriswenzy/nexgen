import PublicLayout from "@/components/layout/public-layout";
import { Container, Row, Col } from "react-bootstrap";

const ComplianceEthicsPolicy = () => {
  return (
    <PublicLayout>
      <section className="py-5 py-lg-7 bg-blue text-white">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="mb-4 fw-bold text-center">
                Compliance & Ethics Policy
              </h1>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5 py-lg-7 bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <h2 className="mt-5">1. Regulatory Framework</h2>
              <p>
                We strictly adhere to applicable national and international
                regulations, including:
              </p>
              <ul>
                <li>
                  Standards set by the Standard Organisation of Nigeria (SON)
                </li>
                <li>ISO 9001 (Quality Management Systems)</li>
                <li>ISO 14001 (Environmental Management Systems)</li>
                <li>Nigeria Data Protection Act (NDPA) 2023</li>
                <li>
                  Environmental and anti-pollution standards (e.g., zero-VOC
                  formulations)
                </li>
                <li>
                  Anti-bribery under the Corrupt Practices & Other Related
                  Offences Act 2000
                </li>
              </ul>

              <h2 className="mt-4">2. Ethical Procurement</h2>
              <p>
                We require our suppliers and contractors to comply with all
                applicable laws regarding:
              </p>
              <ul>
                <li>Labor standards and worker rights</li>
                <li>Environmental responsibility</li>
                <li>Anti-corruption and ethical business practices</li>
              </ul>
              <p>
                We prioritize the use of recyclable and sustainable packaging
                materials.
              </p>

              <h2 className="mt-4">3. Employee Standards</h2>
              <p>All employees undergo mandatory training programs covering:</p>
              <ul>
                <li>Health and safety protocols</li>
                <li>Data protection and privacy</li>
                <li>Corporate ethics and conduct</li>
                <li>Anti-bribery and corruption prevention</li>
              </ul>

              <h2 className="mt-4">4. Whistleblower & Reporting</h2>
              <p>
                We operate confidential reporting channels, including{" "}
                <strong>compliance@nexgenpaint.com</strong>, to enable the
                reporting of misconduct or non-compliance.
              </p>
              <p>
                Whistleblowers are protected under our internal policy, and all
                reports are promptly and thoroughly investigated.
              </p>

              <h2 className="mt-4">5. Audits</h2>
              <p>We conduct annual internal and third-party audits covering:</p>
              <ul>
                <li>Quality control</li>
                <li>Environmental impact</li>
                <li>Labor practices</li>
                <li>Data protection compliance</li>
                <li>Ethical standards</li>
              </ul>

              <h2 className="mt-4">6. Continuous Improvement</h2>
              <p>
                Compliance policies are reviewed annually and revised based on:
              </p>
              <ul>
                <li>Legal and regulatory updates</li>
                <li>Operational and business needs</li>
              </ul>
              <p>
                Changes are communicated through internal channels and published
                on our official website.
              </p>

              <h2 className="mt-4">7. Documentation & Accountability</h2>
              <p>We maintain detailed records of:</p>
              <ul>
                <li>Training completion and compliance awareness</li>
                <li>Audit findings and corrective actions</li>
                <li>Whistleblower reports and resolutions</li>
              </ul>
              <p>
                The Board of Directors reviews a quarterly compliance report to
                ensure accountability at all levels.
              </p>

              <h2 className="mt-4">8. Contact</h2>
              <p>
                For compliance-related questions or to report a concern, contact
                us at: <br />
                <strong>Email:</strong> compliance@nexgenpaint.com
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </PublicLayout>
  );
};

export default ComplianceEthicsPolicy;
