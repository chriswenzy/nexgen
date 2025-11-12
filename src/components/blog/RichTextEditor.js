"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// ✅ Load ReactQuill dynamically (SSR disabled)
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="text-center py-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading editor...</span>
      </div>
    </div>
  ),
});

export default function RichTextEditor({ value, onChange, placeholder }) {
  const quillRef = useRef(null);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "link",
    "image",
    "video",
  ];

  return (
    <div suppressHydrationWarning>
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder || "Write something amazing..."}
        theme="snow"
        style={{ height: "400px" }}
      />
    </div>
  );
}
