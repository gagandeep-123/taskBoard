import React, { useState } from "react";
import TaskCard from "../TaskCard/TaskCard";
import TaskModal from "../TaskModal/TaskModal";

const COLUMNS = ["TODO", "IN_PROGRESS", "COMPLETED"];

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);

  const styles = {
    board: { padding: 20, fontFamily: "sans-serif" },
    header: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 16
    },
    columns: { display: "flex", gap: 16 },
    column: {
      flex: 1,
      background: "#f4f5f7",
      padding: 12,
      borderRadius: 8,
      minHeight: 420
    }
  };

  const handleDrop = (e, status) => {
    const id = e.dataTransfer.getData("id");
    setTasks(t =>
      t.map(task => (task.id === id ? { ...task, status } : task))
    );
  };

  return (
    <div style={styles.board}>
      <div style={styles.header}>
        <h2>Task Board</h2>
        <button onClick={() => setActiveTask({})}>+ Add Task</button>
      </div>

      <div style={styles.columns}>
        {COLUMNS.map(col => (
          <div
            key={col}
            style={styles.column}
            onDragOver={e => e.preventDefault()}
            onDrop={e => handleDrop(e, col)}
          >
            <h4>{col.replaceAll("_", " ")}</h4>

            {tasks
              .filter(t => t.status === col)
              .map(task => (
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
        ))}
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
