import { Row, Col, Card, Button } from "react-bootstrap";
import { FaBoxOpen } from "react-icons/fa";

const EmptyState = ({
  icon: Icon = FaBoxOpen,
  title,
  message,
  buttonText,
  onButtonClick,
}) => {
  return (
    <Row className="d-flex justify-content-center align-items-center text-center py-5">
      <Col md={6}>
        <Card className="border-0 shadow p-4 rounded-4">
          {/* Icon */}
          <div className="text-center">
            <Icon size={80} className="text-primary mb-3" />
          </div>
          {/* Message */}
          <h5 className="fw-bold text-secondary">{title}</h5>
          <p className="text-muted small">{message}</p>

          {/* Call-to-Action */}
          {buttonText && (
            <Button onClick={onButtonClick} className="c-btn">
              {buttonText}
            </Button>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default EmptyState;
