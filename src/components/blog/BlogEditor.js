"use client";
import { formatDate } from "@/util/constant";
import { useState } from "react";
import {
  Form,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Alert,
  InputGroup,
} from "react-bootstrap";

export default function BlogEditor({
  post,
  onSave,
  onCancel,
  mode = "create",
}) {
  const [formData, setFormData] = useState(
    post || {
      title: "",
      excerpt: "",
      content: "",
      category: "",
      status: "Draft",
      featured: false,
      tags: [],
      publishedDate: new Date().toISOString().split("T")[0],
    }
  );
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.excerpt.trim()) newErrors.excerpt = "Excerpt is required";
    if (!formData.content.trim()) newErrors.content = "Content is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleTagKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="g-4">
        <Col lg={8}>
          <Card>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Post Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter blog post title..."
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Excerpt</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Brief description of the blog post..."
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      excerpt: e.target.value,
                    }))
                  }
                  isInvalid={!!errors.excerpt}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.excerpt}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={12}
                  placeholder="Write your blog post content here..."
                  value={formData.content}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  isInvalid={!!errors.content}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.content}
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                  Support for rich text editor can be added here.
                </Form.Text>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          {/* Publish Settings */}
          <Card className="mb-4">
            <Card.Header>
              <h6 className="mb-0">Publish Settings</h6>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, status: e.target.value }))
                  }
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Archived">Archived</option>
                </Form.Select>
              </Form.Group>

              {formData.status === "Scheduled" && (
                <Form.Group className="mb-3">
                  <Form.Label>Publish Date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={formData.publishedDate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        publishedDate: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
              )}

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Featured Post"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      featured: e.target.checked,
                    }))
                  }
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button type="submit" variant="primary">
                  {mode === "create" ? "Publish Post" : "Update Post"}
                </Button>
                <Button
                  type="button"
                  variant="outline-secondary"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* Categories & Tags */}
          <Card className="mb-4">
            <Card.Header>
              <h6 className="mb-0">Categories & Tags</h6>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  isInvalid={!!errors.category}
                >
                  <option value="">Select a category</option>
                  <option value="Interior Painting">Interior Painting</option>
                  <option value="Exterior Painting">Exterior Painting</option>
                  <option value="DIY Tips">DIY Tips</option>
                  <option value="Color Guides">Color Guides</option>
                  <option value="Eco-Friendly">Eco-Friendly</option>
                  <option value="Paint Types">Paint Types</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.category}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Tags</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Add tags..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleTagKeyPress}
                  />
                  <Button variant="outline-secondary" onClick={handleAddTag}>
                    Add
                  </Button>
                </InputGroup>
                <Form.Text className="text-muted">
                  Press Enter or click Add to include tags
                </Form.Text>

                <div className="mt-2">
                  {formData.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      bg="light"
                      text="dark"
                      className="me-1 mb-1"
                    >
                      {tag}
                      <Button
                        variant="link"
                        size="sm"
                        className="text-danger p-0 ms-1"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        ×
                      </Button>
                    </Badge>
                  ))}
                </div>
              </Form.Group>
            </Card.Body>
          </Card>

          {/* Post Information */}
          <Card>
            <Card.Header>
              <h6 className="mb-0">Post Information</h6>
            </Card.Header>
            <Card.Body>
              <div className="small text-muted">
                <div className="mb-2">
                  <strong>Author:</strong> Admin User
                </div>
                <div className="mb-2">
                  <strong>Created:</strong>{" "}
                  {formatDate(new Date().toISOString())}
                </div>
                {post && (
                  <>
                    <div className="mb-2">
                      <strong>Views:</strong> {post.views}
                    </div>
                    <div className="mb-2">
                      <strong>Likes:</strong> {post.likes}
                    </div>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Form>
  );
}
