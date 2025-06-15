import React, { useState } from "react";
import { Card, Badge, ListGroup } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Data dummy tugas
const tasks = [
  {
    id: 1,
    title: "Tugas Matematika",
    date: "2025-06-17",
    type: "Individu",
  },
  {
    id: 2,
    title: "Proyek Kelompok Fisika",
    date: "2025-06-19",
    type: "Kelompok",
  },
  {
    id: 3,
    title: "Makalah Sejarah",
    date: "2025-06-19",
    type: "Individu",
  },
  {
    id: 4,
    title: "Presentasi Kimia",
    date: "2025-06-22",
    type: "Kelompok",
  },
];

function getTasksByDate(date) {
  const d = date.toISOString().slice(0, 10);
  return tasks.filter((task) => task.date === d);
}

const TaskCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const tasksToday = getTasksByDate(selectedDate);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Kalender Tugas</Card.Title>
        <div className="d-flex flex-column flex-md-row gap-4">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileContent={({ date, view }) => {
              if (view === "month") {
                const dayTasks = getTasksByDate(date);
                return dayTasks.length > 0 ? (
                  <Badge bg="primary" pill className="mt-1">
                    {dayTasks.length}
                  </Badge>
                ) : null;
              }
            }}
          />
          <div style={{ minWidth: 220 }}>
            <h6 className="mt-3 mt-md-0">Tugas pada {selectedDate.toLocaleDateString("id-ID")}</h6>
            {tasksToday.length === 0 ? (
              <div className="text-muted">Tidak ada tugas.</div>
            ) : (
              <ListGroup>
                {tasksToday.map((task) => (
                  <ListGroup.Item key={task.id}>
                    <span>{task.title}</span>
                    <Badge
                      bg={task.type === "Individu" ? "info" : "success"}
                      className="ms-2"
                    >
                      {task.type}
                    </Badge>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TaskCalendar;