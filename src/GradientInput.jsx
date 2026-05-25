import React from "react";
import "./gradient-input.css";

export default function GradientInput({ placeholder, value, onChange, type = "text", ...props }) {
  return (
    <label className="gb-wrap">
      <input
        className="gb-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        {...props}
      />
    </label>
  );
}
