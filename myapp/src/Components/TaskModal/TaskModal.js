import React, { useState } from "react";

const TaskModal = ({ task, onSave, onClose }) => {
  const [title, setTitle] = useState(task.title || "");
  const [desc, setDesc] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority || "Low");
  const [error, setError] = useState(false);

  const handleSave = () => {
    if (!title.trim()) {
      setError(true);
      return;
    }

    onSave({
      ...task,
      title,
      description: desc,
      priority
    });
  };

  return (
    <div
      onClick={onClose}   
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        onClick={e => e.stopPropagation()}   
        style={{
          background: "#fff",
          width: 340,
          padding: 30,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 12,
          boxShadow: "0 6px 20px rgba(0,0,0,0.2)"
        }}
      >
        <h3 style={{ marginBottom: 12 }}>
          {task.id ? "Edit Task" : "New Task"}
        </h3>

        <input
          style={{
            width: "100%",
            padding: 8,
            marginBottom: 6,
            borderRadius: 6,
            border: error ? "1px solid #ff4d4f" : "1px solid #ccc",
            outline: "none"
          }}
          placeholder="Title *"
          value={title}
          onChange={e => {
            setTitle(e.target.value);
            if (error) setError(false);
          }}
        />

        {error && (
          <span
            style={{
              color: "#ff4d4f",
              fontSize: 12,
              width: "100%",
              textAlign: "left",
              marginBottom: 8
            }}
          >
            Title is required
          </span>
        )}

        <input
          style={{
            width: "100%",
            padding: 8,
            marginBottom: 10,
            borderRadius: 6,
            border: "1px solid #ccc"
          }}
          placeholder="Description"
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />

       <select
  value={priority}
  onChange={e => setPriority(e.target.value)}
  style={{
    width: "106%",
    padding: "8px",
    marginBottom: 10,
    borderRadius: 8,
    border: "1px solid #d9d9d9",
    background: "#fafafa",
    fontSize: 14,
    fontWeight: 500,
    color: "#1f1f1f",
    cursor: "pointer",
    outline: "none",
    transition: "all 0.2s ease"
  }}
  onFocus={e => (e.target.style.border = "1px solid #1677ff")}
  onBlur={e => (e.target.style.border = "1px solid #d9d9d9")}
>
  <option value="Low">Low Priority</option>
  <option value="Medium">Medium Priority</option>
  <option value="High">High Priority</option>
</select>



        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              border: "1px solid #ccc",
              background: "#fff",
              cursor: "pointer"
            }}
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            style={{
              padding: "6px 14px",
              borderRadius: 6,
              border: "none",
              background: "#1677ff",
              color: "#fff",
              cursor: "pointer"
            }}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
