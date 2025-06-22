import PublicLayout from "@/components/layout/public-layout";
import { Container, Row, Col } from "react-bootstrap";

const ProductWarrantyPolicy = () => {
  return (
    <PublicLayout>
      <section className="py-5 py-lg-7 bg-blue text-white">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="mb-4 fw-bold text-center">
                Product Warranty Policy
              </h1>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5 py-lg-7 bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <h2 className="mt-5">1. Warranty Period</h2>
              <ul>
                <li>
                  <strong>Standard Coatings:</strong> 2 years from the date of
                  delivery.
                </li>
                <li>
                  <strong>Premium Coatings:</strong> Up to 15 years (as
                  specifically stated per product).
                </li>
              </ul>

              <h2 className="mt-4">2. Scope of Coverage</h2>
              <p>This warranty covers manufacturing defects including:</p>
              <ul>
                <li>Peeling</li>
                <li>Cracking</li>
                <li>Flaking</li>
                <li>Fading under normal use and proper installation</li>
              </ul>

              <h2 className="mt-4">3. Exclusions</h2>
              <p>The warranty does not cover defects resulting from:</p>
              <ul>
                <li>Misuse or improper installation</li>
                <li>Unapproved surface preparation</li>
                <li>Accidents, fire, or environmental exposure</li>
                <li>Unauthorized repairs or modifications</li>
                <li>Normal wear and tear</li>
                <li>Aesthetic concerns or color variance</li>
                <li>Carton or packaging damage</li>
              </ul>

              <h2 className="mt-4">4. Claim Procedure</h2>
              <ol>
                <li>
                  Provide proof of purchase, photos, delivery date, and
                  location.
                </li>
                <li>
                  Submit claim via email to{" "}
                  <strong>warranty@nexgenpaint.com</strong>.
                </li>
                <li>
                  We may inspect the product in person or remotely within 30
                  days of submission.
                </li>
              </ol>

              <h2 className="mt-4">5. Remedies</h2>
              <p>If a claim is validated:</p>
              <ul>
                <li>
                  We may supply a replacement product or issue a credit note.
                </li>
                <li>
                  Alternatively, we may re-deliver or perform corrective work at
                  our expense.
                </li>
              </ul>
              <p>
                The remedy is limited to the product cost plus direct labor.
                Consequential or indirect damages are not covered.
              </p>

              <h2 className="mt-4">6. Transferability</h2>
              <p>
                This warranty is non-transferable and applies only to the
                original purchaser and the original site of installation.
              </p>

              <h2 className="mt-4">7. Statutory Rights</h2>
              <p>
                This policy does not affect your rights under the Federal
                Competition & Consumer Protection Act (FCCPA) 2019.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </PublicLayout>
  );
};

export default ProductWarrantyPolicy;
