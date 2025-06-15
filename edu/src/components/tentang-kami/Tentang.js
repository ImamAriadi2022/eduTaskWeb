import React from "react";

const TentangKami = () => (
  <div
    className="d-flex flex-column min-vh-100"
    style={{
      background: "#fffbe6",
      transition: "background 0.5s cubic-bezier(.4,0,.2,1)",
    }}
  >
    <div className="flex-grow-1 p-3">
      <div className="container">
        <h2 className="mb-3" style={{ color: "#ff8800", fontWeight: "bold" }}>Tentang Kami</h2>
        <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <p>
            <b>EduTaskWeb</b> adalah platform manajemen tugas kuliah yang membantu mahasiswa dalam mengatur, memantau, dan menyelesaikan tugas-tugas individu maupun kelompok secara efisien. Kami menyediakan fitur kalender, distribusi tugas, notifikasi deadline, dan statistik tugas agar proses belajar menjadi lebih terstruktur dan produktif.
          </p>
          <p>
            Dengan tampilan yang sederhana dan informatif, EduTaskWeb hadir untuk mendukung mahasiswa mencapai hasil terbaik dalam perkuliahan. Kami percaya, pengelolaan waktu dan tugas yang baik adalah kunci sukses akademik.
          </p>
          <p>
            <b>Hubungi Kami:</b><br />
            Email: support@edutaskweb.com<br />
            Instagram: @edutaskweb
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default TentangKami;