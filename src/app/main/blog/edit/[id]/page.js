"use client";
import { useState, useEffect } from "react";
import { Card, Alert } from "react-bootstrap";
import { useRouter, useParams } from "next/navigation";
import BlogEditor from "@/components/admin/BlogEditor";
import { blogPostsData } from "@/lib/data";

export default function EditBlogPost() {
  const router = useRouter();
  const params = useParams();
  const postId = parseInt(params.id);

  const [post, setPost] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const foundPost = blogPostsData.find((p) => p.id === postId);
    if (foundPost) {
      setPost(foundPost);
    } else {
      router.push("/admin/blog");
    }
  }, [postId, router]);

  const handleSave = (postData) => {
    // In a real app, you would update in your backend here
    console.log("Updating post:", postData);
    setShowAlert(true);
    setTimeout(() => {
      router.push("/admin/blog");
    }, 1500);
  };

  const handleCancel = () => {
    router.push("/admin/blog");
  };

  if (!post) {
    return (
      <Card>
        <Card.Body className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3">Edit Blog Post</h1>
          <p className="text-muted mb-0">Make changes to your blog post</p>
        </div>
      </div>

      {showAlert && (
        <Alert variant="success" className="mb-4">
          Blog post updated successfully! Redirecting...
        </Alert>
      )}

      <BlogEditor
        post={post}
        onSave={handleSave}
        onCancel={handleCancel}
        mode="edit"
      />
    </div>
  );
}
