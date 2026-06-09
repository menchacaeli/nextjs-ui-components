import React from "react";
import "./Skeleton.css";
import { SkeletonProps } from "./skeleton.ts";

const Skeleton = ({
  variant = "rectangular",
  width,
  height,
  lines = 3,
  className = "",
  style,
}: SkeletonProps) => {
  const sizeStyle: React.CSSProperties = {
    width:  typeof width  === "number" ? `${width}px`  : width,
    height: typeof height === "number" ? `${height}px` : height,
    ...style,
  };

  if (variant === "text") {
    return (
      <div className="skeleton--text-wrap" style={sizeStyle}>
        {Array.from({ length: lines }).map((_, i) => (
          <span key={i} className={`skeleton skeleton--text-line ${className}`} />
        ))}
      </div>
    );
  }

  return (
    <span
      className={`skeleton skeleton--${variant} ${className}`}
      style={sizeStyle}
      aria-hidden="true"
    />
  );
};

export default Skeleton;
