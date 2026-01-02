const TaskCard = ({ task, onEdit, onDelete }) => {
  const colors = {
    High: "#ff4d4f",
    Medium: "#faad14",
    Low: "#52c41a"
  };

  const styles = {
    card: {
      background: "#fff",
      padding: 10,
      marginBottom: 10,
      borderRadius: 8,
      boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
      borderLeft: `5px solid ${colors[task.priority]}`,
      cursor: "grab"
    },
    actions: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 6
    }
  };

  return (
    <div
      style={styles.card}
      draggable
      onDragStart={e => e.dataTransfer.setData("id", task.id)}
    >
      <strong>{task.title}</strong>
      <p style={{ fontSize: 13, margin: "4px 0" }}>
        {task.description}
      </p>

      <div style={styles.actions}>
        <small>{task.priority}</small>
        <div>
          <button onClick={() => onEdit(task)}>Edit</button>
          <button onClick={() => onDelete(task.id)}>✕</button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
