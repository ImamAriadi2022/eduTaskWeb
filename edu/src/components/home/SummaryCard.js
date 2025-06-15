import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FaClipboardList, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

// Data dummy summary
const summary = [
  {
    title: "Total Tugas",
    value: 12,
    icon: <FaClipboardList size={28} className="text-primary" />,
    bg: "light",
  },
  {
    title: "Tugas Selesai",
    value: 7,
    icon: <FaCheckCircle size={28} className="text-success" />,
    bg: "light",
  },
  {
    title: "Mendekati Deadline",
    value: 2,
    icon: <FaExclamationTriangle size={28} className="text-warning" />,
    bg: "light",
  },
];

const SummaryCards = () => (
  <Row className="mb-4">
    {summary.map((item, idx) => (
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

export default SummaryCards;