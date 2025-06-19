import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import { FaClipboardList, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const SummaryCards = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setSummary({
        total: 0,
        selesai: 0,
        mendekati: 0,
      });
      setLoading(false);
      return;
    }
    fetch(` https://edu-backend-mocha.vercel.app/api/summary/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setSummary(data);
        setLoading(false);
      })
      .catch(() => {
        setSummary({
          total: 0,
          selesai: 0,
          mendekati: 0,
        });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Row className="mb-4">
        <Col className="text-center">
          <Spinner animation="border" variant="warning" />
        </Col>
      </Row>
    );
  }

  const summaryList = [
    {
      title: "Total Tugas",
      value: summary?.total || 0,
      icon: <FaClipboardList size={28} className="text-primary" />,
      bg: "light",
    },
    {
      title: "Tugas Selesai",
      value: summary?.selesai || 0,
      icon: <FaCheckCircle size={28} className="text-success" />,
      bg: "light",
    },
    {
      title: "Mendekati Deadline",
      value: summary?.mendekati || 0,
      icon: <FaExclamationTriangle size={28} className="text-warning" />,
      bg: "light",
    },
  ];

  return (
    <Row className="mb-4">
      {summaryList.map((item, idx) => (
        <Col md={4} key={idx} className="mb-3">
          <Card bg={item.bg} className="h-100 shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <div className="me-3">{item.icon}</div>
              <div>
                <div style={{ fontSize: 22, fontWeight: "bold" }}>{item.value}</div>
                <div style={{ fontSize: 14, color: "#666" }}>{item.title}</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default SummaryCards;