"use client";
import { useState } from "react";
import { Card, Alert } from "react-bootstrap";
import { useRouter } from "next/navigation";
import BlogEditor from "@/components/blog/BlogEditor";
import EnhancedBlogEditor from "@/components/blog/EnhancedBlogEditor";
import BlogEditorPro from "@/components/blog/BlogEditorPro";
import Tiptap from "@/components/blog/Tiptap";

export default function NewBlogPost() {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [content, setContent] = useState(`<h1>Getting started</h1>
  <p>Welcome to the <strong>Simple Editor</strong> template! This template integrates open source UI components and Tiptap extensions licensed under MIT.</p>
  <p>Integrate it by following the Tiptap UI Components docs or using our CLI tool.</p>
  <p><code>[npx @tiptap/cli init]</code></p>
  <h2>Features</h2>
  <p>A fully responsive rich text editor with built-in support for common formatting and layout tools. Type markdown <strong>**</strong> or use keyboard shortcuts for most all common markdown marks.</p>
  <p>Add images, customize alignment, and apply advanced formatting to make your writing more engaging and professional.</p>
  <hr/>
  <p><strong>Tiptap</strong><br/>Placeholder Image</p>
  <p><em>tiptap.dev/ui-components</em></p>`);
  const handleSave = (postData) => {
    // In a real app, you would save to your backend here
    console.log("Saving post:", content);
    // setShowAlert(true);
    // setTimeout(() => {
    //   router.push("/main/blog");
    // }, 1500);
  };

  const handleCancel = () => {
    router.push("/main/blog");
  };

  return (
    <div>
      <div className="">
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
      {/* <EnhancedBlogEditor
        onSave={handleSave}
        onCancel={handleCancel}
        mode="create"
      /> */}

      {/* <Tiptap
        initialContent={content}
        onContentChange={setContent}
        placeholder="Start writing your content..."
      /> */}
      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-500 font-medium">
          {content.replace(/<[^>]*>/g, "").length} characters
        </div>
        <button
          onClick={() => console.log("Content:", content)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          Save Content
        </button>
      </div>

      {/* <BlogEditorPro content={content} onChange={setContent} /> */}
      {/* <BlogEditor onSave={handleSave} onCancel={handleCancel} mode="create" /> */}
    </div>
  );
}
