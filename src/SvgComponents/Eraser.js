import * as React from "react";

function Eraser(props) {
  return (
    <svg
      aria-hidden="true"
      width="1em"
      height="1em"
      style={{
        msTransform: "rotate(360deg)",
        WebkitTransform: "rotate(360deg)"
      }}
      viewBox="0 0 24 24"
      transform="rotate(360)"
      {...props}
    >
      <path
        d="M16.24 3.56l4.95 4.94c.78.79.78 2.05 0 2.84L12 20.53a4.008 4.008 0 01-5.66 0L2.81 17c-.78-.79-.78-2.05 0-2.84l10.6-10.6c.79-.78 2.05-.78 2.83 0M4.22 15.58l3.54 3.53c.78.79 2.04.79 2.83 0l3.53-3.53-4.95-4.95-4.95 4.95z"
        fill="black"
      />
    </svg>
  );
}

export default Eraser;
