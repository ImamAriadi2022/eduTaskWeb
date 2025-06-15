import React from "react";
import Sidebar from "../components/sidebar";
import BrandNavbar from "../components/navbar";
import Footer from "../components/footer";
import PengaturanAkun from "../components/akun/akun";

const AkunPage = () => (
  <div
    className="d-flex flex-column min-vh-100"
    style={{
      background: "#fffbe6",
      transition: "background 0.5s cubic-bezier(.4,0,.2,1)",
    }}
  >
    <BrandNavbar />
    <div className="d-flex flex-grow-1">
      <Sidebar />
      <div className="flex-grow-1 p-3 d-flex justify-content-center align-items-center">
        <PengaturanAkun />
      </div>
    </div>
    <Footer />
  </div>
);

export default AkunPage;