"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import { useEffect, useState } from "react";

// Toolbar Icons
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatAlignJustify,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdLink,
} from "react-icons/md";

import {
  RxLetterCaseCapitalize,
  RxLetterCaseToggle,
  RxLetterCaseUppercase,
} from "react-icons/rx";

// interface TiptapEditorProps {
//   value?: string;
//   onChange?: (value: string) => void;
//   onBlur?: (event: React.FocusEvent) => void;
//   onKeyDown?: (event: React.KeyboardEvent) => void;
//   editor?: Editor | null;
//   error?: string;
//   showToolbar?: boolean;
// }

export default function TiptapEditor({
  value = "",
  onChange = () => {},
  onBlur = () => {},
  onKeyDown = () => {},
  editor: externalEditor,
  error,
  showToolbar = true,
}) {
  const [isMounted, setIsMounted] = useState(false);

  const internalEditor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      BulletList,
      OrderedList,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Use the external editor if provided, otherwise use the internal editor
  const editor = externalEditor || internalEditor;

  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (internalEditor) {
        internalEditor.destroy();
      }
    };
  }, [internalEditor]);

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor || !isMounted) {
    return null;
  }

  // Case Change Functions
  const changeCase = () => {
    const { from, to } = editor.state.selection;
    const text = editor.state.doc.textBetween(from, to, " ");

    let newText = text;
    switch (type) {
      case "lowercase":
        newText = text.toLowerCase();
        break;
      case "uppercase":
        newText = text.toUpperCase();
        break;
      case "sentence":
        newText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        break;
      default:
        break;
    }

    editor.chain().focus().insertContent(newText).run();
  };

  return (
    <div className="tiptap-editor">
      {/* Editor */}
      <EditorContent
        editor={editor}
        className={`editor-content ${error ? "input-error" : ""}`}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />

      {/* Conditionally render toolbar */}
      {showToolbar && (
        <div className="toolbar">
          {/* Bold */}
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            <MdFormatBold />
          </button>

          {/* Italic */}
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            <MdFormatItalic />
          </button>

          {/* Underline */}
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? "is-active" : ""}
          >
            <MdFormatUnderlined />
          </button>

          {/* Text Alignment */}
          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={
              editor.isActive({ textAlign: "left" }) ? "is-active" : ""
            }
          >
            <MdFormatAlignLeft />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={
              editor.isActive({ textAlign: "center" }) ? "is-active" : ""
            }
          >
            <MdFormatAlignCenter />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={
              editor.isActive({ textAlign: "right" }) ? "is-active" : ""
            }
          >
            <MdFormatAlignRight />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={
              editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
            }
          >
            <MdFormatAlignJustify />
          </button>

          {/* Lists */}
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            <MdFormatListBulleted />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "is-active" : ""}
          >
            <MdFormatListNumbered />
          </button>

          {/* Link */}
          <button
            onClick={() => {
              const previousUrl = editor.getAttributes("link").href;
              const url = window.prompt("Enter URL", previousUrl);

              if (url === null) return;

              if (url === "") {
                editor
                  .chain()
                  .focus()
                  .extendMarkRange("link")
                  .unsetLink()
                  .run();
                return;
              }

              editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: url })
                .run();
            }}
            className={editor.isActive("link") ? "is-active" : ""}
          >
            <MdLink />
          </button>

          {/* Case Change */}
          <button onClick={() => changeCase("lowercase")}>
            <RxLetterCaseToggle />
          </button>
          <button onClick={() => changeCase("uppercase")}>
            <RxLetterCaseUppercase />
          </button>
          <button onClick={() => changeCase("sentence")}>
            <RxLetterCaseCapitalize />
          </button>
        </div>
      )}
    </div>
  );
}
