"use client";
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

export default function RichTextEditor2({ value, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit, Link, Image],
    content: value || "<p>Write something amazing...</p>",
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
  });

  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("Enter image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div className="tiptap-editor">
      <div className="tiptap-toolbar">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "active" : ""}
          title="Bold"
        >
          <FiBold size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "active" : ""}
          title="Italic"
        >
          <FiItalic size={18} />
        </button>
        <button
          onClick={() => {
            const url = window.prompt("Enter link URL");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          className={editor.isActive("link") ? "active" : ""}
          title="Insert Link"
        >
          <FiLink size={18} />
        </button>
        <button onClick={addImage} title="Insert Image">
          <FiImage size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "active" : ""}
          title="Bullet List"
        >
          <FiList size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "active" : ""}
          title="Ordered List"
        >
          <FiListOl size={18} />
        </button>
      </div>

      <EditorContent editor={editor} className="tiptap-content" />
    </div>
  );
}
