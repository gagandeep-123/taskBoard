const TaskCard = ({ task, onEdit, onDelete }) => {
  const colors = {
    High: "#ff4d4f",
    Medium: "#faad14",
    Low: "#52c41a"
  };

  return (
    <div
      draggable
      onDragStart={e => e.dataTransfer.setData("id", task.id)}
      style={{
        background: "#fafafa",
        padding: 12,
        marginBottom: 12,
        borderRadius: 10,
        borderLeft: `6px solid ${colors[task.priority]}`,
        boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
        cursor: "grab"
      }}
    >
      <strong>{task.title}</strong>

      <p
        style={{
          fontSize: 13,
          margin: "6px 0",
          color: "#555"
        }}
      >
        {task.description}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <span
          style={{
            fontSize: 12,
            padding: "2px 8px",
            borderRadius: 12,
            background: colors[task.priority],
            color: "#fff"
          }}
        >
          {task.priority}
        </span>

        <div style={{ display: "flex", gap: 6 }}>
          <button
            style={{
              border: "none",
              background: "#1677ff",
              color: "#fff",
              padding: "4px 8px",
              borderRadius: 4,
              cursor: "pointer"
            }}
            onClick={() => onEdit(task)}
          >
            Edit
          </button>

          <button
            style={{
              border: "none",
              background: "#ff4d4f",
              color: "#fff",
              padding: "4px 8px",
              borderRadius: 4,
              cursor: "pointer"
            }}
            onClick={() => onDelete(task.id)}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
