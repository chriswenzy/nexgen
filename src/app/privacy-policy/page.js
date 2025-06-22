import PublicLayout from "@/components/layout/public-layout";
import { Container, Row, Col, Table } from "react-bootstrap";

const PrivacyPolicy = () => {
  return (
    <PublicLayout>
      <section className="py-5 py-lg-7 bg-blue text-white">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="mb-4 fw-bold text-center">
                Privacy, Data Protection & Cookie Policy
              </h1>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5 py-lg-7 bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <h2 className="mt-5">1. Data Controller</h2>
              <p>
                Nexgen Paint Industries Ltd is the data controller for all
                personal data collected via this site.
              </p>

              <h2 className="mt-4">2. Data Collected</h2>
              <ul>
                <li>
                  <strong>Personal:</strong> Name, email, phone, address,
                  payment info.
                </li>
                <li>
                  <strong>Technical:</strong> IP address, device/browser info,
                  usage metrics.
                </li>
                <li>
                  <strong>Cookies & Tracking:</strong> We use cookies for
                  essential functions, analytics, and marketing.
                </li>
              </ul>

              <h2 className="mt-4">3. Legal Basis & Purpose</h2>
              <p>
                We process data on the basis of consent, contract, and
                legitimate interest — to operate the site, fulfill orders,
                improve services, send marketing communications (with opt-out),
                and comply with legal obligations such as the NDPA and tax laws.
              </p>

              <h2 className="mt-4">4. Sharing & Transfers</h2>
              <p>We may share data with:</p>
              <ul>
                <li>
                  Payment processors, delivery partners, and IT/service
                  providers;
                </li>
                <li>Legal authorities as required by law;</li>
                <li>
                  Overseas providers with adequate safeguards (e.g., standard
                  contractual clauses or NDPA-compliant practices).
                </li>
              </ul>

              <h2 className="mt-4">5. Data Retention</h2>
              <p>
                Personal data is retained only as long as necessary — for order
                processing, tax compliance, fraud prevention, or until the user
                withdraws consent.
              </p>

              <h2 className="mt-4">6. Your Rights</h2>
              <p>
                Under the Nigeria Data Protection Act (NDPA), you have the right
                to:
              </p>
              <ul>
                <li>
                  Access, correct, delete, restrict, or object to the processing
                  of your data;
                </li>
                <li>Request data portability;</li>
                <li>Withdraw consent at any time;</li>
                <li>
                  Lodge complaints with the Nigeria Data Protection Commission
                  (NDPC).
                </li>
              </ul>
              <p>
                To exercise your rights, contact:{" "}
                <strong>info@nexgenpaint.com</strong>
              </p>

              <h2 className="mt-4">7. Cookies</h2>
              <Table bordered responsive className="mt-3">
                <thead>
                  <tr>
                    <th>Cookie Type</th>
                    <th>Purpose</th>
                    <th>Expires</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Necessary</td>
                    <td>Site functionality (login, shopping cart)</td>
                    <td>Session</td>
                  </tr>
                  <tr>
                    <td>Analytics</td>
                    <td>Site usage insights</td>
                    <td>12 months</td>
                  </tr>
                  <tr>
                    <td>Marketing</td>
                    <td>Targeted ads</td>
                    <td>24 months</td>
                  </tr>
                </tbody>
              </Table>
              <p>
                You can disable cookies via your browser settings, but doing so
                may affect site functionality. Visit the “Cookie Settings” link
                on the site to manage your preferences.
              </p>

              <h2 className="mt-4">8. Data Security</h2>
              <p>
                We implement technical measures (e.g., encryption, secure
                servers) and organizational measures (e.g., access control,
                staff training). However, no system is 100% secure.
              </p>

              <h2 className="mt-4">9. Minors</h2>
              <p>
                Our services are available only to users aged 18 and above. We
                do not knowingly collect data from minors.
              </p>

              <h2 className="mt-4">10. Updates</h2>
              <p>
                We may update this policy periodically. Updates will be posted
                on the site. Where required, we will notify you via email.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </PublicLayout>
  );
};

export default PrivacyPolicy;
