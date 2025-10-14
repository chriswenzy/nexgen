"use client";
import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

// Dynamically import ReactQuill to avoid SSR issues
// const ReactQuill = dynamic(() => import("react-quill"), {
//   ssr: false,
//   loading: () => (
//     <div className="quill-loading">
//       <div className="spinner-border text-primary" role="status">
//         <span className="visually-hidden">Loading editor...</span>
//       </div>
//     </div>
//   ),
// });

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your blog post content...",
}) {
  const quillRef = useRef(null);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ align: [] }],
        ["blockquote", "code-block"],
        ["link", "image", "video"],
        ["clean"],
      ],
      handlers: {
        // Image handler will be implemented with file upload
      },
    },
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "list",
    "bullet",
    "indent",
    "align",
    "blockquote",
    "code-block",
    "link",
    "image",
    "video",
  ];

  return (
    <div className="rich-text-editor">
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        theme="snow"
        style={{ height: "400px" }}
      />
    </div>
  );
}
