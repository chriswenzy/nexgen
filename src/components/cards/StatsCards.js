import { Row, Col, Card, CardBody } from "react-bootstrap";

// Make sure this is exported as default
export default function StatsCards({ stats }) {
  return (
    <Row className="g-3 mb-4">
      {stats.map((stat, index) => (
        <Col xs={12} sm={6} lg={3} key={index}>
          <Card className="stat-card h-100">
            <CardBody>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="card-title text-muted mb-2">{stat.title}</h6>
                  <h3 className="fw-bold text-primary">{stat.value}</h3>
                  <small
                    className={`text-${
                      stat.trend === "up" ? "success" : "danger"
                    }`}
                  >
                    {stat.change} {stat.trend === "up" ? "↗" : "↘"} from last
                    month
                  </small>
                </div>
                <div
                  className={`stat-icon bg-${
                    stat.trend === "up" ? "success" : "danger"
                  }-subtle`}
                >
                  {stat.icon}
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
