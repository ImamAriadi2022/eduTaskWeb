import React, { useState, useEffect } from "react";
import { Card, Badge, ListGroup, Spinner } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const TaskCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data tugas dari backend
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }
    fetch(`https://edu-backend-mocha.vercel.app/api/kalender/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function getTasksByDate(date) {
    const d = date.toISOString().slice(0, 10);
    return tasks.filter((task) => task.deadline === d);
  }

  const tasksToday = getTasksByDate(selectedDate);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Kalender Tugas</Card.Title>
        {loading ? (
          <div className="text-center my-4">
            <Spinner animation="border" variant="warning" />
          </div>
        ) : (
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
              <h6 className="mt-3 mt-md-0">
                Tugas pada {selectedDate.toLocaleDateString("id-ID")}
              </h6>
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
        )}
      </Card.Body>
    </Card>
  );
};

export default TaskCalendar;