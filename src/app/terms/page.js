import PublicLayout from "@/components/layout/public-layout";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BsQuestionCircleFill } from "react-icons/bs";

const TermsOfService = () => {
  return (
    <PublicLayout>
      <div className="faq-page">
        {/* Hero Section */}
        <section className="py-5 py-lg-7 bg-blue text-white">
          <Container>
            <Row className="justify-content-center text-center">
              <Col lg={8}>
                <h1 className="display-4 fw-bold mb-4">Terms of Service</h1>
                <p className="lead mb-0">
                  Your go-to hub for valuable information, advice, and industry
                  insights designed to help homeowners, professionals, and
                  creatives make informed choices with every brushstroke.
                </p>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Terms Content */}
        <section className="py-5 py-lg-7">
          <Container>
            <h1 className="mb-4">Terms of Service</h1>
            {/* Use map or modular component for terms if needed. Keeping hardcoded for now */}
            <div className="terms-content">
              {/* Sectioned terms */}
              <h2 className="mt-4">1. About Nexgen Paint Industries Ltd</h2>
              <p>
                Nexgen Paint Ltd (“Nexgen”, “we”, “us”, “our”) is a paint and
                surface coatings manufacturer and distributor incorporated in
                Nigeria. Our registered office is located at:
              </p>
              <ul>
                <li>12 Industrial Road, Lagos, Nigeria</li>
                <li>RC No: 7993622</li>
              </ul>

              <h2 className="mt-4">2. Use of This Website</h2>
              <p>
                You agree to use the website only for lawful purposes and in
                accordance with these Terms. You must not:
              </p>
              <ul>
                <li>
                  Use the site in breach of any local, national, or
                  international law;
                </li>
                <li>
                  Upload or transmit malware, harmful material, or illegal
                  content;
                </li>
                <li>
                  Attempt to gain unauthorized access to the website or its
                  systems.
                </li>
              </ul>

              <h2 className="mt-4">3. Eligibility</h2>
              <p>
                You must be 18 years or older and have the legal capacity to
                enter into binding contracts under Nigerian law. If you use our
                services on behalf of a business, you confirm that you are
                authorized to bind that business.
              </p>

              <h2 className="mt-4">4. Intellectual Property Rights</h2>
              <p>
                All content on our website is owned or licensed by Nexgen and
                protected under copyright laws. You may not reuse any part of it
                without our written permission.
              </p>

              <h2 className="mt-4">5. Product Orders</h2>
              <ul>
                <li>
                  <strong>Offer:</strong> Placing an order is an offer to
                  purchase.
                </li>
                <li>
                  <strong>Acceptance:</strong> We reserve the right to accept or
                  reject orders.
                </li>
                <li>
                  <strong>Pricing:</strong> Prices are in Nigerian Naira (₦),
                  VAT exclusive unless stated.
                </li>
                <li>
                  <strong>Payment:</strong> Accepted methods include bank
                  transfer, POS, and online payment.
                </li>
                <li>
                  <strong>Contract Formation:</strong> Confirmed when you
                  receive written acceptance.
                </li>
              </ul>

              <h2 className="mt-4">6. Delivery & Risk</h2>
              <ul>
                <li>Delivery dates are estimates.</li>
                <li>Risk transfers on delivery.</li>
                <li>Ownership transfers after full payment.</li>
              </ul>

              <h2 className="mt-4">7. Returns & Cancellations</h2>
              <ul>
                <li>Subject to our Product Warranty Policy.</li>
                <li>Orders can only be canceled with written approval.</li>
                <li>Restocking or handling fees may apply.</li>
              </ul>

              <h2 className="mt-4">8. Limitation of Liability</h2>
              <p>Nexgen is not liable for:</p>
              <ul>
                <li>Loss of profit, goodwill, or indirect damages;</li>
                <li>Misuse or negligence by the customer;</li>
                <li>Force Majeure events (e.g., strikes, disasters).</li>
              </ul>
              <p>Our liability is limited to the purchase price.</p>

              <h2 className="mt-4">9. User Accounts</h2>
              <p>
                You are responsible for your login credentials. We may suspend
                accounts for misuse.
              </p>

              <h2 className="mt-4">10. Warranties and Disclaimers</h2>
              <p>
                Products are provided &quot;as is&quot;. Implied warranties are
                disclaimed unless required by law.
              </p>

              <h2 className="mt-4">11. Force Majeure</h2>
              <p>
                Performance is suspended during uncontrollable events like
                pandemics or natural disasters.
              </p>

              <h2 className="mt-4">12. Termination</h2>
              <p>
                We may terminate access if Terms are violated. Certain
                provisions survive termination.
              </p>

              <h2 className="mt-4">13. Governing Law & Jurisdiction</h2>
              <p>
                Governed by Nigerian law. Disputes will first go to mediation,
                then Lagos courts.
              </p>

              <h2 className="mt-4">14. Amendments</h2>
              <p>
                Terms may change. Continued use indicates acceptance of updates.
              </p>

              <h2 className="mt-4">15. Third-Party Services</h2>
              <p>
                We are not responsible for third-party content or services
                linked from our site.
              </p>

              <h2 className="mt-4">16. Indemnity</h2>
              <p>
                You agree to indemnify Nexgen for any damages due to misuse or
                breach of Terms.
              </p>

              <h2 className="mt-4">17. Entire Agreement</h2>
              <p>
                This agreement includes all referenced policies and supersedes
                prior versions.
              </p>

              <h2 className="mt-4">18. Contact Information</h2>
              <ul>
                <li>
                  <strong>Email:</strong> info@nexgenpaint.com
                </li>
                <li>
                  <strong>Phone:</strong> +234 813 935 8527
                </li>
                <li>
                  <strong>Registered Office:</strong> 12 Industrial Road, Lagos,
                  Nigeria
                </li>
              </ul>
            </div>
          </Container>
        </section>

        {/* Still Have Questions Section */}
        <section className="py-5 py-lg-7 bg-light">
          <Container>
            <Row className="justify-content-center">
              <Col lg={8} className="text-center">
                <div className="icon-wrapper bg-primary bg-opacity-10 rounded-circle p-4 mb-4 mx-auto d-inline-flex">
                  <BsQuestionCircleFill size={88} className="text-primary" />
                </div>
                <h2 className="mb-4">Still Have Questions?</h2>
                <p className="lead mb-5 mx-auto" style={{ maxWidth: "600px" }}>
                  We&apos;re happy to help. Contact our support team directly
                  for personalized assistance.
                </p>
                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <Button
                    variant="primary"
                    size="md"
                    className="rounded-pill px-4"
                  >
                    Call: +234 906 796 6435
                  </Button>
                  <Button
                    variant="outline-primary"
                    size="md"
                    className="rounded-pill px-4"
                  >
                    Email: support@nexgenpaint.com
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </PublicLayout>
  );
};

export default TermsOfService;
