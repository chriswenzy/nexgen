import {
  Row,
  Col,
  Card,
  Table,
  ProgressBar,
  CardBody,
  CardHeader,
} from "react-bootstrap";
import StatsCards from "@/components/cards/StatsCards"; // Make sure this path is correct
import { ordersData, productsData, statsData } from "@/util/data";
import {
  FaUsers,
  FaChartLine,
  FaShoppingCart,
  FaDollarSign,
} from "react-icons/fa";
import { getStatusVariant } from "@/util/constant";

export default function OverviewPage() {
  const topProducts = productsData.slice(0, 5);

  const sampleStats = [
    {
      title: "Users",
      value: "1,250",
      change: "+5%",
      trend: "up",
      icon: <FaUsers className="fs-4" />, // Added className for consistent sizing
    },
    {
      title: "Revenue",
      value: "$12,400",
      change: "+2%",
      trend: "up",
      icon: <FaDollarSign className="fs-4" />,
    },
    {
      title: "Orders",
      value: "321",
      change: "-1%",
      trend: "down",
      icon: <FaShoppingCart className="fs-4" />,
    },
    {
      title: "Growth",
      value: "3.5%",
      change: "+0.8%",
      trend: "up",
      icon: <FaChartLine className="fs-4" />,
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Dashboard Overview</h1>
        <div>Last updated: Today</div>
      </div>

      <StatsCards stats={sampleStats} />

      <Row className="g-4">
        <Col lg={8}>
          <Card>
            <CardHeader>
              <h5 className="mb-0">Recent Orders</h5>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {ordersData.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.amount}</td>
                      <td>
                        <span
                          className={`badge bg-${getStatusVariant(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td>{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>

        <Col lg={4}>
          <Card>
            <CardHeader>
              <h5 className="mb-0">Top Products</h5>
            </CardHeader>
            <CardBody>
              {topProducts.map((product) => (
                <div key={product.id} className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span>{product.name}</span>
                    <small className="text-muted">{product.sales} sales</small>
                  </div>
                  <ProgressBar
                    now={(product.sales / 250) * 100}
                    variant={getStatusVariant(product.status)}
                    style={{ height: "6px" }}
                  />
                </div>
              ))}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
