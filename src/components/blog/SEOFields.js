"use client";
import { useState, useEffect } from "react";
import { Card, Form, Alert, InputGroup, Button } from "react-bootstrap";

export default function SEOFields({
  title,
  excerpt,
  onSEOUpdate,
  initialData = {},
}) {
  const [seoData, setSeoData] = useState({
    metaTitle: initialData.metaTitle || "",
    metaDescription: initialData.metaDescription || "",
    slug: initialData.slug || "",
    canonicalUrl: initialData.canonicalUrl || "",
    focusKeyword: initialData.focusKeyword || "",
    ...initialData,
  });

  const [preview, setPreview] = useState({
    title: "",
    url: "",
    description: "",
  });

  useEffect(() => {
    if (title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

      setSeoData((prev) => ({
        ...prev,
        metaTitle: prev.metaTitle || title.substring(0, 60),
        metaDescription:
          prev.metaDescription || excerpt?.substring(0, 160) || "",
        slug: prev.slug || generatedSlug,
      }));
    }
  }, [title, excerpt]);

  useEffect(() => {
    if (onSEOUpdate) {
      onSEOUpdate(seoData);
    }

    // Update preview
    setPreview({
      title: seoData.metaTitle || "Page Title",
      url: `https://yourdomain.com/blog/${seoData.slug || "post-slug"}`,
      description: seoData.metaDescription || "Page description...",
    });
  }, [seoData, onSEOUpdate]);

  const handleChange = (field, value) => {
    setSeoData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const generateSlug = () => {
    if (title) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      handleChange("slug", slug);
    }
  };

  const getTitleLengthColor = () => {
    const length = seoData.metaTitle?.length || 0;
    if (length === 0) return "secondary";
    if (length <= 50) return "success";
    if (length <= 60) return "warning";
    return "danger";
  };

  const getDescriptionLengthColor = () => {
    const length = seoData.metaDescription?.length || 0;
    if (length === 0) return "secondary";
    if (length <= 150) return "success";
    if (length <= 160) return "warning";
    return "danger";
  };

  return (
    <Card>
      <Card.Header>
        <h6 className="mb-0">SEO Optimization</h6>
      </Card.Header>
      <Card.Body>
        {/* Google Preview */}
        <div className="mb-4">
          <h6 className="mb-2">Google Preview</h6>
          <div className="google-preview border rounded p-3 bg-light">
            <div className="text-primary mb-1" style={{ fontSize: "0.875rem" }}>
              {preview.url}
            </div>
            <div
              className="text-dark fw-bold mb-1"
              style={{ fontSize: "1.125rem" }}
            >
              {preview.title}
            </div>
            <div className="text-muted" style={{ fontSize: "0.875rem" }}>
              {preview.description}
            </div>
          </div>
        </div>

        {/* SEO Fields */}
        <Form.Group className="mb-3">
          <Form.Label>
            Meta Title
            <span className={`badge bg-${getTitleLengthColor()} ms-2`}>
              {seoData.metaTitle?.length || 0}/60
            </span>
          </Form.Label>
          <Form.Control
            type="text"
            value={seoData.metaTitle}
            onChange={(e) => handleChange("metaTitle", e.target.value)}
            placeholder="Meta title for search engines (recommended: 50-60 characters)"
          />
          <Form.Text className="text-muted">
            This is what appears in search engine results. Keep it under 60
            characters.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            Meta Description
            <span className={`badge bg-${getDescriptionLengthColor()} ms-2`}>
              {seoData.metaDescription?.length || 0}/160
            </span>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={seoData.metaDescription}
            onChange={(e) => handleChange("metaDescription", e.target.value)}
            placeholder="Meta description for search engines (recommended: 150-160 characters)"
          />
          <Form.Text className="text-muted">
            This description appears in search engine results below the title.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>URL Slug</Form.Label>
          <InputGroup>
            <InputGroup.Text>https://yourdomain.com/blog/</InputGroup.Text>
            <Form.Control
              type="text"
              value={seoData.slug}
              onChange={(e) => handleChange("slug", e.target.value)}
              placeholder="post-url-slug"
            />
            <Button
              variant="outline-secondary"
              onClick={generateSlug}
              disabled={!title}
            >
              Generate
            </Button>
          </InputGroup>
          <Form.Text className="text-muted">
            User-friendly URL for this post. Use lowercase letters, numbers, and
            hyphens.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Focus Keyword</Form.Label>
          <Form.Control
            type="text"
            value={seoData.focusKeyword}
            onChange={(e) => handleChange("focusKeyword", e.target.value)}
            placeholder="primary keyword for this post"
          />
          <Form.Text className="text-muted">
            The main keyword you want to rank for with this post.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Canonical URL</Form.Label>
          <Form.Control
            type="url"
            value={seoData.canonicalUrl}
            onChange={(e) => handleChange("canonicalUrl", e.target.value)}
            placeholder="https://example.com/canonical-url"
          />
          <Form.Text className="text-muted">
            Use if this content appears elsewhere on the web to avoid duplicate
            content issues.
          </Form.Text>
        </Form.Group>

        {/* SEO Analysis */}
        <div className="seo-analysis mt-4 p-3 border rounded bg-light">
          <h6 className="mb-3">SEO Analysis</h6>
          <div className="row">
            <div className="col-6">
              <div className="text-center">
                <div className={`badge bg-${getTitleLengthColor()} mb-1`}>
                  Title
                </div>
                <div className="small">
                  {seoData.metaTitle?.length || 0}/60 chars
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="text-center">
                <div className={`badge bg-${getDescriptionLengthColor()} mb-1`}>
                  Description
                </div>
                <div className="small">
                  {seoData.metaDescription?.length || 0}/160 chars
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
