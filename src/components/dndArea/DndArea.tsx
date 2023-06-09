"use client";

import React, { useState, useRef, useEffect } from "react";
import Profile from "./Profile";

const profileWidth = 224;

export default function DndArea() {
  const profileRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [cursorOffset, setCursorOffset] = useState({ x: 0 });
  const [centerX, setCenterX] = useState(window.innerWidth / 2 - profileWidth / 2);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (profileRef.current) {
      const rect = profileRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      setCursorOffset({ x: offsetX });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const { current } = profileRef;

    if (current) {
      const rectLeft = e.clientX - cursorOffset.x;
      current.style.transform = `translateX(${rectLeft}px)`;
      if (current && rectLeft < 56) {
        current.style.transform = `translateX(56px)`;
      }
      if (current && rectLeft + profileWidth > window.innerWidth - 56) {
        const x = window.innerWidth - profileWidth - 56;
        current.style.transform = `translateX(${x}px)`;
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setCenterX(window.innerWidth / 2 - profileWidth / 2);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="overflow-x-hidden">
      <div
        ref={profileRef}
        className="relative w-56 cursor-grab select-none z-30"
        style={{ transform: `translateX(${centerX}px)` }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        <Profile />
      </div>
    </section>
  );
}