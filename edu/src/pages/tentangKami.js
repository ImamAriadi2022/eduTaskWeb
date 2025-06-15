import React from "react";
import Sidebar from "../components/sidebar";
import BrandNavbar from "../components/navbar";
import Footer from "../components/footer";

const TentangKami = () => (
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
      <div className="flex-grow-1 p-3">
        <div className="container">
          <h2 className="mb-3" style={{ color: "#ff8800", fontWeight: "bold" }}>Tentang Kami</h2>
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <p>
                      <b>Edu Task</b>  adalah teman setia mahasiswa dalam mengatur tugas dan deadline kuliah.
          Kami tahu gimana ribetnya ngatur banyak tugas, jadwal kuliah, dan kegiatan lainnya.
          Makanya, Edu Task hadir buat bantu kamu tetap on track!
          </p>
          <p>
                      Dengan fitur pencatat deadline, pengingat tugas, dan jadwal kuliah yang praktis, kami
          siap jadi solusi biar tugas nggak lagi numpuk atau kelupaan. Simpel, cepat, dan pastinya
          ngebantu!
          </p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default TentangKami;