import React from "react";

const Footer = () => (
  <footer
    style={{
      backgroundColor: "#222831",
      color: "#fff",
      textAlign: "center",
      padding: "1rem",
      marginTop: "40px",
    }}
  >
    <p>© {new Date().getFullYear()} InclusionLens. All rights reserved.</p>
  </footer>
);

export default Footer;
