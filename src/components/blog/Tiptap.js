"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Highlight from "@tiptap/extension-highlight";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Dropdown,
  Form,
  InputGroup,
  Modal,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./Tiptap.css";

// Register languages for code highlighting
lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);

const Tiptap = ({
  initialContent = "",
  onContentChange,
  placeholder = "Start writing your blog post...",
  editable = true,
  className = "",
}) => {
  const debounceRef = useRef();
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        codeBlock: false,
      }),
      Placeholder.configure({
        placeholder: placeholder,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "editor-link",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "editor-image",
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Color.configure({
        types: ["textStyle"],
      }),
      TextStyle,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: initialContent,
    editable,
    autofocus: false,
    immediatelyRender: false,
    injectCSS: false,

    onUpdate: ({ editor }) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        const html = editor.getHTML();
        const text = editor.getText();

        setWordCount(
          text.split(/\s+/).filter((word) => word.length > 0).length
        );
        setCharCount(text.length);

        if (onContentChange) {
          onContentChange(html);
        }
      }, 300);
    },
  });

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  if (!editor) {
    return (
      <Container fluid className="p-0">
        <div className="editor-loading">
          <div className="loading-spinner"></div>
          <p>Loading Editor...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="p-0">
      <Row>
        <Col>
          <div className={`rich-text-editor ${className}`}>
            <Toolbar editor={editor} />
            <EditorContent editor={editor} className="editor-content" />
            <EditorStatus
              wordCount={wordCount}
              charCount={charCount}
              editor={editor}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const Toolbar = ({ editor }) => {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState("#000000");

  if (!editor) return null;

  const addLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl("");
      setShowLinkModal(false);
    }
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
    setShowLinkModal(false);
  };

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
      setShowImageModal(false);
    }
  };

  const setColor = (color) => {
    editor.chain().focus().setColor(color).run();
    setCurrentColor(color);
  };

  const addTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  const deleteTable = () => {
    editor.chain().focus().deleteTable().run();
  };

  const addTaskList = () => {
    editor.chain().focus().toggleTaskList().run();
  };

  const addCodeBlock = () => {
    editor.chain().focus().setCodeBlock().run();
  };

  const addBlockquote = () => {
    editor.chain().focus().setBlockquote().run();
  };

  const addHorizontalRule = () => {
    editor.chain().focus().setHorizontalRule().run();
  };

  const clearFormatting = () => {
    editor.chain().focus().clearNodes().unsetAllMarks().run();
  };

  return (
    <>
      <div className="toolbar-container">
        <div className="toolbar-scroll">
          <ButtonGroup className="toolbar-group">
            {/* Text Formatting */}
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle
                variant="outline-secondary"
                size="sm"
                className="toolbar-btn"
              >
                Aa
              </Dropdown.Toggle>
              <Dropdown.Menu className="toolbar-dropdown">
                <Dropdown.Item
                  onClick={() => editor.chain().focus().setParagraph().run()}
                  active={editor.isActive("paragraph")}
                >
                  Paragraph
                </Dropdown.Item>
                <Dropdown.Divider />
                {[1, 2, 3, 4, 5, 6].map((level) => (
                  <Dropdown.Item
                    key={level}
                    onClick={() =>
                      editor.chain().focus().toggleHeading({ level }).run()
                    }
                    active={editor.isActive("heading", { level })}
                  >
                    Heading {level}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Button
              variant={
                editor.isActive("bold") ? "primary" : "outline-secondary"
              }
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className="toolbar-btn"
              title="Bold"
            >
              <strong>B</strong>
            </Button>

            <Button
              variant={
                editor.isActive("italic") ? "primary" : "outline-secondary"
              }
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className="toolbar-btn"
              title="Italic"
            >
              <em>I</em>
            </Button>

            <Button
              variant={
                editor.isActive("underline") ? "primary" : "outline-secondary"
              }
              size="sm"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className="toolbar-btn"
              title="Underline"
            >
              <u>U</u>
            </Button>

            <Button
              variant={
                editor.isActive("strike") ? "primary" : "outline-secondary"
              }
              size="sm"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className="toolbar-btn"
              title="Strikethrough"
            >
              <s>S</s>
            </Button>

            <Dropdown as={ButtonGroup}>
              <Button
                variant={
                  editor.isActive("highlight") ? "primary" : "outline-secondary"
                }
                size="sm"
                className="toolbar-btn"
              >
                🎨
              </Button>
              <Dropdown.Toggle
                split
                variant="outline-secondary"
                size="sm"
                className="toolbar-btn"
              />
              <Dropdown.Menu className="toolbar-dropdown">
                <Dropdown.Item
                  onClick={() => editor.chain().focus().toggleHighlight().run()}
                >
                  Yellow Highlight
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .toggleHighlight({ color: "#ff0000" })
                      .run()
                  }
                >
                  Red Highlight
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .toggleHighlight({ color: "#00ff00" })
                      .run()
                  }
                >
                  Green Highlight
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </ButtonGroup>

          <ButtonGroup className="toolbar-group">
            {/* Text Alignment */}
            <Button
              variant={
                editor.isActive({ textAlign: "left" })
                  ? "primary"
                  : "outline-secondary"
              }
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className="toolbar-btn"
              title="Align Left"
            >
              ⬅
            </Button>

            <Button
              variant={
                editor.isActive({ textAlign: "center" })
                  ? "primary"
                  : "outline-secondary"
              }
              size="sm"
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              className="toolbar-btn"
              title="Align Center"
            >
              ⬌
            </Button>

            <Button
              variant={
                editor.isActive({ textAlign: "right" })
                  ? "primary"
                  : "outline-secondary"
              }
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className="toolbar-btn"
              title="Align Right"
            >
              ➡
            </Button>
          </ButtonGroup>

          <ButtonGroup className="toolbar-group">
            {/* Lists */}
            <Button
              variant={
                editor.isActive("bulletList") ? "primary" : "outline-secondary"
              }
              size="sm"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className="toolbar-btn"
              title="Bullet List"
            >
              • List
            </Button>

            <Button
              variant={
                editor.isActive("orderedList") ? "primary" : "outline-secondary"
              }
              size="sm"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className="toolbar-btn"
              title="Numbered List"
            >
              1. List
            </Button>

            <Button
              variant={
                editor.isActive("taskList") ? "primary" : "outline-secondary"
              }
              size="sm"
              onClick={addTaskList}
              className="toolbar-btn"
              title="Task List"
            >
              ☑ List
            </Button>
          </ButtonGroup>

          <ButtonGroup className="toolbar-group">
            {/* Blocks */}
            <Button
              variant={
                editor.isActive("blockquote") ? "primary" : "outline-secondary"
              }
              size="sm"
              onClick={addBlockquote}
              className="toolbar-btn"
              title="Blockquote"
            >
              ❝
            </Button>

            <Button
              variant={
                editor.isActive("codeBlock") ? "primary" : "outline-secondary"
              }
              size="sm"
              onClick={addCodeBlock}
              className="toolbar-btn"
              title="Code Block"
            >
              {`</>`}
            </Button>

            <Button
              variant="outline-secondary"
              size="sm"
              onClick={addHorizontalRule}
              className="toolbar-btn"
              title="Horizontal Rule"
            >
              ➖
            </Button>
          </ButtonGroup>

          <ButtonGroup className="toolbar-group">
            {/* Tables */}
            <Dropdown as={ButtonGroup}>
              <Button
                variant="outline-secondary"
                size="sm"
                className="toolbar-btn"
              >
                Table
              </Button>
              <Dropdown.Toggle
                split
                variant="outline-secondary"
                size="sm"
                className="toolbar-btn"
              />
              <Dropdown.Menu className="toolbar-dropdown">
                <Dropdown.Item onClick={addTable}>Insert Table</Dropdown.Item>
                <Dropdown.Item onClick={deleteTable}>
                  Delete Table
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => editor.chain().focus().addColumnBefore().run()}
                >
                  Add Column Before
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => editor.chain().focus().addColumnAfter().run()}
                >
                  Add Column After
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => editor.chain().focus().deleteColumn().run()}
                >
                  Delete Column
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => editor.chain().focus().addRowBefore().run()}
                >
                  Add Row Before
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => editor.chain().focus().addRowAfter().run()}
                >
                  Add Row After
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => editor.chain().focus().deleteRow().run()}
                >
                  Delete Row
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </ButtonGroup>

          <ButtonGroup className="toolbar-group">
            {/* Media */}
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setShowLinkModal(true)}
              className="toolbar-btn"
              title="Add Link"
            >
              🔗
            </Button>

            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setShowImageModal(true)}
              className="toolbar-btn"
              title="Add Image"
            >
              🖼️
            </Button>
          </ButtonGroup>

          <ButtonGroup className="toolbar-group">
            {/* Color Picker */}
            <Dropdown
              as={ButtonGroup}
              show={showColorPicker}
              onToggle={setShowColorPicker}
            >
              <Dropdown.Toggle
                variant="outline-secondary"
                size="sm"
                className="toolbar-btn"
              >
                🎨 Color
              </Dropdown.Toggle>
              <Dropdown.Menu className="color-picker-dropdown">
                <div className="color-picker">
                  {[
                    "#000000",
                    "#ff0000",
                    "#00ff00",
                    "#0000ff",
                    "#ffff00",
                    "#ff00ff",
                    "#00ffff",
                    "#ffffff",
                  ].map((color) => (
                    <button
                      key={color}
                      className="color-option"
                      style={{ backgroundColor: color }}
                      onClick={() => setColor(color)}
                    />
                  ))}
                  <Form.Control
                    type="color"
                    value={currentColor}
                    onChange={(e) => setColor(e.target.value)}
                    className="color-input"
                  />
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </ButtonGroup>

          <ButtonGroup className="toolbar-group">
            {/* Actions */}
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => editor.chain().focus().undo().run()}
              className="toolbar-btn"
              title="Undo"
            >
              ↶
            </Button>

            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => editor.chain().focus().redo().run()}
              className="toolbar-btn"
              title="Redo"
            >
              ↷
            </Button>

            <Button
              variant="outline-danger"
              size="sm"
              onClick={clearFormatting}
              className="toolbar-btn"
              title="Clear Formatting"
            >
              Clear
            </Button>
          </ButtonGroup>
        </div>
      </div>

      {/* Link Modal */}
      <Modal show={showLinkModal} onHide={() => setShowLinkModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>URL</Form.Label>
            <Form.Control
              type="url"
              placeholder="https://example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLinkModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={removeLink}>
            Remove Link
          </Button>
          <Button variant="primary" onClick={addLink}>
            Add Link
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Image Modal */}
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImageModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addImage}>
            Add Image
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const EditorStatus = ({ wordCount, charCount, editor }) => {
  return (
    <div className="editor-status">
      <Row className="align-items-center">
        <Col>
          <small className="text-muted">
            Words: {wordCount} | Characters: {charCount}
          </small>
        </Col>
        <Col xs="auto">
          <Button
            variant="outline-info"
            size="sm"
            onClick={() => console.log("HTML:", editor.getHTML())}
          >
            View HTML
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Tiptap;
