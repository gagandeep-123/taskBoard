import React, { useState } from "react";

const TaskModal = ({ task, onSave, onClose }) => {
  const [title, setTitle] = useState(task.title || "");
  const [desc, setDesc] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority || "Low");

  const styles = {
    overlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.45)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    box: {
      background: "#fff",
      padding: 20,
      width: 320,
      borderRadius: 10
    },
    input: {
      width: "100%",
      padding: 8,
      marginBottom: 10
    },
    actions: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 8
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.box}>
        <h3>{task.id ? "Edit Task" : "New Task"}</h3>

        <input
          style={styles.input}
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          style={styles.input}
          placeholder="Description"
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />

        <select
          style={styles.input}
          value={priority}
          onChange={e => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <div style={styles.actions}>
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={() =>
              title &&
              onSave({
                ...task,
                title,
                description: desc,
                priority
              })
            }
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
