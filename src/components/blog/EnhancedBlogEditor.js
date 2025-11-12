"use client";
import { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Alert,
  Tabs,
  Tab,
} from "react-bootstrap";
import dynamic from "next/dynamic";
import ImageUpload from "./ImageUpload";
import SEOFields from "./SEOFields";

// Dynamically import heavy components
const RichTextEditorDynamic = dynamic(() => import("./RichTextEditor2"), {
  ssr: false,
  loading: () => <div>Loading editor...</div>,
});

export default function EnhancedBlogEditor({
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
      image: null,
      seo: {
        metaTitle: "",
        metaDescription: "",
        slug: "",
        canonicalUrl: "",
        focusKeyword: "",
      },
    }
  );

  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState("content");

  useEffect(() => {
    // Generate initial SEO data from title
    if (mode === "create" && formData.title && !formData.seo.metaTitle) {
      setFormData((prev) => ({
        ...prev,
        seo: {
          ...prev.seo,
          metaTitle: prev.title.substring(0, 60),
          metaDescription: prev.excerpt.substring(0, 160),
          slug: generateSlug(prev.title),
        },
      }));
    }
  }, [formData.title, formData.excerpt, mode]);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.excerpt.trim()) newErrors.excerpt = "Excerpt is required";
    if (!formData.content.trim()) newErrors.content = "Content is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.seo.slug.trim()) newErrors.slug = "URL slug is required";

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

  const handleImageUpload = (imageData) => {
    setFormData((prev) => ({
      ...prev,
      image: imageData,
    }));
  };

  const handleSEOUpdate = (seoData) => {
    setFormData((prev) => ({
      ...prev,
      seo: { ...prev.seo, ...seoData },
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

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Tabs
        activeKey={activeTab}
        onSelect={(tab) => setActiveTab(tab)}
        className="mb-4"
      >
        <Tab eventKey="content" title="📝 Content">
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
                      onChange={(e) => updateField("title", e.target.value)}
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
                      onChange={(e) => updateField("excerpt", e.target.value)}
                      isInvalid={!!errors.excerpt}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.excerpt}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <RichTextEditorDynamic
                      value={formData.content}
                      onChange={(content) => updateField("content", content)}
                      placeholder="Write your blog post content here..."
                    />
                    {errors.content && (
                      <div className="text-danger small mt-2">
                        {errors.content}
                      </div>
                    )}
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4}>
              <ImageUpload
                onUploadComplete={handleImageUpload}
                existingImage={formData.image}
                folder="blog"
              />

              <Card className="mt-4">
                <Card.Header>
                  <h6 className="mb-0">Categories & Tags</h6>
                </Card.Header>
                <Card.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      value={formData.category}
                      onChange={(e) => updateField("category", e.target.value)}
                      isInvalid={!!errors.category}
                    >
                      <option value="">Select a category</option>
                      <option value="Interior Painting">
                        Interior Painting
                      </option>
                      <option value="Exterior Painting">
                        Exterior Painting
                      </option>
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
                    <div className="input-group">
                      <Form.Control
                        type="text"
                        placeholder="Add tags..."
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={handleTagKeyPress}
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={handleAddTag}
                      >
                        Add
                      </Button>
                    </div>
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
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="seo" title="🔍 SEO">
          <Row className="g-4">
            <Col lg={8}>
              <SEOFields
                title={formData.title}
                excerpt={formData.excerpt}
                onSEOUpdate={handleSEOUpdate}
                initialData={formData.seo}
              />
            </Col>
            <Col lg={4}>
              <Card>
                <Card.Header>
                  <h6 className="mb-0">SEO Tips</h6>
                </Card.Header>
                <Card.Body>
                  <div className="small">
                    <ul className="list-unstyled mb-0">
                      <li className="mb-2">
                        ✅ Include focus keyword in title
                      </li>
                      <li className="mb-2">
                        ✅ Write compelling meta description
                      </li>
                      <li className="mb-2">✅ Use descriptive URL slugs</li>
                      <li className="mb-2">✅ Add alt text to images</li>
                      <li className="mb-2">
                        ✅ Use headings properly (H1, H2, H3)
                      </li>
                      <li>✅ Internal linking to related content</li>
                    </ul>
                  </div>
                </Card.Body>
              </Card>

              <Card className="mt-4">
                <Card.Header>
                  <h6 className="mb-0">Social Preview</h6>
                </Card.Header>
                <Card.Body>
                  <div className="social-preview border rounded p-3 bg-light text-center">
                    {formData.image ? (
                      <img
                        src={formData.image.url}
                        alt="Preview"
                        className="img-fluid mb-2 rounded"
                        style={{ maxHeight: "150px" }}
                      />
                    ) : (
                      <div
                        className="bg-secondary rounded mb-2 d-flex align-items-center justify-content-center"
                        style={{ height: "150px" }}
                      >
                        <span className="text-white">Image Preview</span>
                      </div>
                    )}
                    <div className="small text-start">
                      <div className="fw-bold text-truncate">
                        {formData.seo.metaTitle ||
                          formData.title ||
                          "Post Title"}
                      </div>
                      <div className="text-muted text-truncate">
                        {formData.seo.metaDescription ||
                          formData.excerpt ||
                          "Post description..."}
                      </div>
                      <div className="text-primary small">yourdomain.com</div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="settings" title="⚙️ Settings">
          <Row className="g-4">
            <Col lg={8}>
              <Card>
                <Card.Header>
                  <h6 className="mb-0">Publish Settings</h6>
                </Card.Header>
                <Card.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      value={formData.status}
                      onChange={(e) => updateField("status", e.target.value)}
                    >
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Archived">Archived</option>
                    </Form.Select>
                  </Form.Group>

                  {formData.status === "Scheduled" && (
                    <Form.Group className="mb-3">
                      <Form.Label>Publish Date & Time</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        value={formData.publishedDate}
                        onChange={(e) =>
                          updateField("publishedDate", e.target.value)
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
                        updateField("featured", e.target.checked)
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Enable Comments"
                      checked={formData.enableComments !== false}
                      onChange={(e) =>
                        updateField("enableComments", e.target.checked)
                      }
                    />
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>
      </Tabs>

      {/* Action Buttons */}
      <Card>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <Button variant="outline-secondary" onClick={onCancel}>
              Cancel
            </Button>
            <div>
              <Button
                type="submit"
                variant="primary"
                className="me-2"
                onClick={() => updateField("status", "Published")}
              >
                {mode === "create" ? "Publish" : "Update"}
              </Button>
              <Button
                type="submit"
                variant="outline-primary"
                onClick={() => updateField("status", "Draft")}
              >
                Save Draft
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Form>
  );
}
