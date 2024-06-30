import React from "react";

// Spinner functional component
const Spinner = () => {
  return (
    // Container for the loader to position it properly
    <div className="loader-container">
      {/* The loader itself, usually styled with CSS */}
      <div className="loader"></div>
    </div>
  );
};

export default Spinner;
