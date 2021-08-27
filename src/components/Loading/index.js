import React from "react";

function Loading() {
  return (
    <div className="container loading position-relative">
      <div
        className="spinner-border color-1 position-absolute top-50 start-50 translate-middle"
        role="status"
      >
        <span className="sr-only ">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
