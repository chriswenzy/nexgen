"use client";
import { useState } from "react";
import {
  Card,
  Button,
  Badge,
  Form,
  InputGroup,
  Dropdown,
  Row,
  Col,
} from "react-bootstrap";
import Link from "next/link";
import { formatDate, formatViews, getBlogStatusVariant } from "@/util/constant";

export default function BlogList({ posts, onEdit, onDelete, onStatusChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || post.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleDelete = (post) => {
    if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
      onDelete(post);
    }
  };

  const handleStatusChange = (post, newStatus) => {
    onStatusChange(post, newStatus);
  };

  return (
    <div>
      {/* Filters and Search */}
      <Card className="mb-4">
        <Card.Body>
          <Row className="g-3">
            <Col md={4}>
              <InputGroup>
                <Form.Control
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <Form.Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Archived">Archived</option>
              </Form.Select>
            </Col>
            <Col md={3}>
              <Form.Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="Interior Painting">Interior Painting</option>
                <option value="Exterior Painting">Exterior Painting</option>
                <option value="DIY Tips">DIY Tips</option>
                <option value="Color Guides">Color Guides</option>
                <option value="Eco-Friendly">Eco-Friendly</option>
                <option value="Paint Types">Paint Types</option>
              </Form.Select>
            </Col>
            <Col md={2}>
              <Link href="/admin/blog/new" passHref>
                <Button variant="primary" className="w-100">
                  + New Post
                </Button>
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Blog Posts Grid */}
      <Row className="g-4">
        {filteredPosts.map((post) => (
          <Col key={post.id} lg={6} xl={4}>
            <Card className="h-100 blog-post-card">
              <div className="position-relative">
                {/* Featured Badge */}
                {post.featured && (
                  <Badge
                    bg="warning"
                    className="position-absolute top-0 start-0 m-2"
                  >
                    Featured
                  </Badge>
                )}

                {/* Post Image */}
                <div
                  className="blog-post-image"
                  style={{
                    height: "200px",
                    background: `linear-gradient(45deg, #${post.id
                      .toString()
                      .padStart(6, "0")}, #${((post.id * 123456) % 16777215)
                      .toString(16)
                      .padStart(6, "0")})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "2rem",
                  }}
                >
                  📝
                </div>
              </div>

              <Card.Body className="d-flex flex-column">
                <div className="mb-2">
                  <Badge
                    bg={getBlogStatusVariant(post.status)}
                    className="me-2"
                  >
                    {post.status}
                  </Badge>
                  <Badge bg="outline-secondary" text="dark">
                    {post.category}
                  </Badge>
                </div>

                <Card.Title className="h5 mb-2">{post.title}</Card.Title>
                <Card.Text className="text-muted small mb-3 flex-grow-1">
                  {post.excerpt}
                </Card.Text>

                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center text-muted small mb-3">
                    <span>By {post.author}</span>
                    <span>{formatDate(post.publishedDate)}</span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="text-muted small">
                      <span className="me-3">👁️ {formatViews(post.views)}</span>
                      <span>❤️ {post.likes}</span>
                    </div>

                    <Dropdown>
                      <Dropdown.Toggle variant="outline-primary" size="sm">
                        Actions
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => onEdit(post)}>
                          Edit Post
                        </Dropdown.Item>

                        <Dropdown.Divider />

                        <Dropdown.Item
                          onClick={() => handleStatusChange(post, "Published")}
                          disabled={post.status === "Published"}
                        >
                          Publish
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleStatusChange(post, "Draft")}
                          disabled={post.status === "Draft"}
                        >
                          Move to Draft
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleStatusChange(post, "Archived")}
                          disabled={post.status === "Archived"}
                        >
                          Archive
                        </Dropdown.Item>

                        <Dropdown.Divider />

                        <Dropdown.Item
                          onClick={() => handleDelete(post)}
                          className="text-danger"
                        >
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {filteredPosts.length === 0 && (
        <Card>
          <Card.Body className="text-center py-5">
            <div className="text-muted">
              <h5>No blog posts found</h5>
              <p>Try adjusting your search or filters</p>
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}
