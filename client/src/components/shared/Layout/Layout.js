import React from "react"; // Importing React library
import Header from "./Header"; // Importing Header component
import Sidebar from "./Sidebar"; // Importing Sidebar component

// Layout component definition
const Layout = ({ children }) => {
  return (
    <>
      {/* Header section */}
      <div className="header">
        <Header /> {/* Rendering Header component */}
      </div>
      {/* Main content section with row and column structure */}
      <div className="row g-0">
        <div className="col-md-3">
          <Sidebar /> {/* Rendering Sidebar component in the left column */}
        </div>
        <div className="col-md-9">
          {children} {/* Rendering children components in the right column */}
        </div>
      </div>
    </>
  );
};

export default Layout; // Exporting Layout component as default export
