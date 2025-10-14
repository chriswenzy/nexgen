"use client";
import { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import Link from "next/link";
import BlogList from "@/components/blog/BlogList";
import { blogCategories, blogPostsData } from "@/util/data";

export default function BlogPage() {
  const [posts, setPosts] = useState(blogPostsData);
  const [categories] = useState(blogCategories);

  const handleEdit = (post) => {
    window.location.href = `/main/blog/edit/${post.id}`;
  };

  const handleDelete = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const handleStatusChange = (post, newStatus) => {
    setPosts(
      posts.map((p) => (p.id === post.id ? { ...p, status: newStatus } : p))
    );
  };

  const blogStats = [
    {
      title: "Total Posts",
      value: posts.length,
      icon: "📝",
      color: "primary",
    },
    {
      title: "Published",
      value: posts.filter((p) => p.status === "Published").length,
      icon: "✅",
      color: "success",
    },
    {
      title: "Drafts",
      value: posts.filter((p) => p.status === "Draft").length,
      icon: "📄",
      color: "warning",
    },
    {
      title: "Categories",
      value: categories.length,
      icon: "📂",
      color: "info",
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3">Blog Management</h1>
          <p className="text-muted mb-0">Manage your blog posts and content</p>
        </div>
        <Link href="/main/blog/new" passHref>
          <Button variant="primary">+ New Post</Button>
        </Link>
      </div>

      {/* Blog Stats */}
      <Row className="g-3 mb-4">
        {blogStats.map((stat, index) => (
          <Col xs={6} sm={3} key={index}>
            <Card className="stat-card">
              <Card.Body className="text-center">
                <div
                  className={`stat-icon bg-${stat.color}-subtle text-${stat.color} mb-2`}
                >
                  {stat.icon}
                </div>
                <h3 className="fw-bold">{stat.value}</h3>
                <p className="text-muted mb-0 small">{stat.title}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Blog Posts */}
      <Card>
        <Card.Body>
          <BlogList
            posts={posts}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        </Card.Body>
      </Card>
    </div>
  );
}
