import React, { useState, useEffect } from "react";
import TaskCard from "../TaskCard/TaskCard";
import TaskModal from "../TaskModal/TaskModal";

const COLUMNS = ["TODO", "IN_PROGRESS", "COMPLETED"];

const TaskBoard = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDrop = (e, status) => {
    const id = e.dataTransfer.getData("id");
    setTasks(t =>
      t.map(task => (task.id === id ? { ...task, status } : task))
    );
  };

  const totalTasks = tasks.length;

  return (
    <div
      style={{
        padding: 24,
        minHeight: "100vh",
        background: "#f0f2f5",
        fontFamily: "Segoe UI, sans-serif"
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20
        }}
      >
        <h2 style={{ margin: 0 }}>📋 Task Board</h2>

        <button
          style={{
            padding: "8px 14px",
            background: "#1677ff",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer"
          }}
          onClick={() => setActiveTask({})}
        >
          + Add Task
        </button>
      </div>

      {/* Columns */}
      <div style={{ display: "flex", gap: 16 }}>
        {COLUMNS.map(col => {
          const columnTasks = tasks
            .filter(t => t.status === col)
            .sort((a, b) => {
              const priorityOrder = { High: 1, Medium: 2, Low: 3 };
              return priorityOrder[a.priority] - priorityOrder[b.priority];
            });

          const columnCount = columnTasks.length;

          return (
            <div
              key={col}
              onDragOver={e => e.preventDefault()}
              onDrop={e => handleDrop(e, col)}
              style={{
                flex: 1,
                background: "#fff",
                borderRadius: 10,
                padding: 14,
                minHeight: 450,
                boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
              }}
            >
              <h4
                style={{
                  marginBottom: 12,
                  paddingBottom: 8,
                  borderBottom: "1px solid #eee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  fontSize: 14,
                  fontWeight: 600
                }}
              >
                {col.replaceAll("_", " ")}

                {columnCount > 0 && (
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: 999,
                      background: "#f0f2f5",
                      fontSize: 12,
                      fontWeight: 500,
                      color: "#595959"
                    }}
                  >
                    {columnCount}/{totalTasks}
                  </span>
                )}
              </h4>

              {columnTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={setActiveTask}
                  onDelete={id =>
                    setTasks(tasks.filter(t => t.id !== id))
                  }
                />
              ))}
            </div>
          );
        })}
      </div>

      {activeTask !== null && (
        <TaskModal
          task={activeTask}
          onClose={() => setActiveTask(null)}
          onSave={task => {
            setTasks(prev =>
              task.id
                ? prev.map(t => (t.id === task.id ? task : t))
                : [
                    ...prev,
                    { ...task, id: crypto.randomUUID(), status: "TODO" }
                  ]
            );
            setActiveTask(null);
          }}
        />
      )}
    </div>
  );
};

export default TaskBoard;
