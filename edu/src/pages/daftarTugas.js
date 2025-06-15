import React from "react";
import Sidebar from "../components/sidebar";
import BrandNavbar from "../components/navbar";
import Footer from "../components/footer";
import Individu from "../components/daftartugas/individu";
import Kelompok from "../components/daftartugas/kelompok";
import { Tabs, Tab, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const DaftarTugas = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Tentukan tab aktif berdasarkan path
  const getTabFromPath = () => {
    if (location.pathname.includes("/tugas/kelompok")) return "kelompok";
    return "individu";
  };

  const [tab, setTab] = React.useState(getTabFromPath());

  // Update tab jika path berubah
  React.useEffect(() => {
    setTab(getTabFromPath());
  }, [location.pathname]);

  // Navigasi saat tab diganti
  const handleTabSelect = (k) => {
    setTab(k);
    if (k === "kelompok") {
      navigate("/tugas/kelompok");
    } else {
      navigate("/tugas/individu");
    }
  };

  return (
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
            <h2 className="mb-3" style={{ color: "#ff8800", fontWeight: "bold" }}>
              Daftar Tugas
            </h2>
            <Card style={{ borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <Card.Body>
                <Tabs
                  activeKey={tab}
                  onSelect={handleTabSelect}
                  className="mb-3"
                  justify
                >
                  <Tab eventKey="individu" title="Individu">
                    <Individu />
                  </Tab>
                  <Tab eventKey="kelompok" title="Kelompok">
                    <Kelompok />
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DaftarTugas;