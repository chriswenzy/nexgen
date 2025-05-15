"use client";
import { useEffect, useState } from "react";
// import "./CustomCursor.css";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleHover = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"], .hover-effect'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true));
        el.addEventListener("mouseleave", () => setIsHovering(false));
      });
    };

    document.addEventListener("mousemove", moveCursor);
    handleHover();

    return () => {
      document.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${isHovering ? "cursor-hover" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
};

export default CustomCursor;
