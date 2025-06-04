import PublicLayout from "@/components/layout/public-layout";
import { faqCategories } from "@/util/data";
import {
  Container,
  Accordion,
  Row,
  Col,
  Card,
  Button,
  CardBody,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
} from "react-bootstrap";
import {
  BsTruck,
  BsPalette,
  BsPaintBucket,
  BsArrowReturnLeft,
  BsHandshake,
  BsQuestionCircle,
  BsQuestionCircleFill,
} from "react-icons/bs";

const FQApage = () => {
  return (
    <PublicLayout>
      <div className="faq-page">
        {/* Hero Section */}
        <section className="py-5 py-lg-7 bg-blue text-white">
          <Container>
            <Row className="justify-content-center text-center">
              <Col lg={8}>
                <h1 className="display-4 fw-bold mb-4">Help Center</h1>
                <p className="lead mb-0">
                  Your go-to hub for valuable information, advice, and industry
                  insights designed to help homeowners, professionals, and
                  creatives make informed choices with every brushstroke.
                </p>
              </Col>
            </Row>
          </Container>
        </section>

        {/* FAQ Categories */}
        <section className="py-5 py-lg-7">
          <Container>
            <Row className="g-4">
              {faqCategories.map((category, index) => (
                <Col key={index} lg={6}>
                  <Card className="h-100 border-0 shadow-sm">
                    <CardBody className="p-4">
                      <div className="d-flex align-items-center mb-4">
                        <div className="icon-wrapper bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                          {category.icon}
                        </div>
                        <h3 className="mb-0">{category.title}</h3>
                      </div>

                      <Accordion flush>
                        {category.items.map((item, itemIndex) => (
                          <AccordionItem
                            key={itemIndex}
                            eventKey={`${index}-${itemIndex}`}
                            className="mb-3 border-0"
                          >
                            <AccordionHeader className="bg-light rounded-3 px-3">
                              <span className="fw-medium">{item.question}</span>
                            </AccordionHeader>
                            <AccordionBody className="px-3 pt-3">
                              {item.answer}
                            </AccordionBody>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
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

export default FQApage;
