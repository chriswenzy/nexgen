"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
// import { lowlight } from "lowlight/lib/core";
import {
  FiBold,
  FiItalic,
  FiLink,
  FiImage,
  FiList,
  FiListOl,
  FiCode,
} from "react-icons/fi";

export default function BlogEditorPro({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: content || "<p>Start writing your blog post...</p>",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none p-5 min-h-[350px] focus:outline-none",
      },
    },
  });

  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("Enter image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden transition-all hover:shadow-md">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 items-center px-4 py-2 border-b border-gray-200 bg-gray-50">
        <ToolbarButton
          icon={<FiBold size={18} />}
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold"
        />
        <ToolbarButton
          icon={<FiItalic size={18} />}
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic"
        />
        <ToolbarButton
          icon={<FiLink size={18} />}
          active={editor.isActive("link")}
          onClick={() => {
            const url = window.prompt("Enter link URL");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          title="Add Link"
        />
        <ToolbarButton
          icon={<FiImage size={18} />}
          onClick={addImage}
          title="Add Image"
        />
        <ToolbarButton
          icon={<FiList size={18} />}
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bullet List"
        />
        <ToolbarButton
          icon={<FiList size={18} />}
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Ordered List"
        />
        <ToolbarButton
          icon={<FiCode size={18} />}
          active={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          title="Code Block"
        />
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="p-3" />
    </div>
  );
}

/* --- Toolbar Button Component --- */
function ToolbarButton({ icon, onClick, active, title }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-2 rounded-lg transition ${
        active
          ? "bg-blue-100 text-blue-600"
          : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
      }`}
    >
      {icon}
    </button>
  );
}
