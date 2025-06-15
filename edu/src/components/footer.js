import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => (
  <footer className="bg-light py-3 mt-auto">
    <Container className="text-center">
      <small>&copy; {new Date().getFullYear()} NamaBrand. All rights reserved.</small>
    </Container>
  </footer>
);

export default Footer;