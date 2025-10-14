"use client";
import { useState } from "react";
import { Card, Alert } from "react-bootstrap";
import { useRouter } from "next/navigation";
import BlogEditor from "@/components/blog/BlogEditor";
import EnhancedBlogEditor from "@/components/blog/EnhancedBlogEditor";

export default function NewBlogPost() {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);

  const handleSave = (postData) => {
    // In a real app, you would save to your backend here
    console.log("Saving post:", postData);
    setShowAlert(true);
    setTimeout(() => {
      router.push("/main/blog");
    }, 1500);
  };

  const handleCancel = () => {
    router.push("/main/blog");
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3">Create New Blog Post</h1>
          <p className="text-muted mb-0">Write and publish a new blog post</p>
        </div>
      </div>

      {showAlert && (
        <Alert variant="success" className="mb-4">
          Blog post saved successfully! Redirecting...
        </Alert>
      )}
      <EnhancedBlogEditor
        onSave={handleSave}
        onCancel={handleCancel}
        mode="create"
      />
      {/* <BlogEditor onSave={handleSave} onCancel={handleCancel} mode="create" /> */}
    </div>
  );
}
