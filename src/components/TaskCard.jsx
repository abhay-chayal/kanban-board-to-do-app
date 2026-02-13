import { useState } from "react";

function TaskCard({ task, deleteTask, moveTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const getBorderColor = () => {
    if (task.priority === "High") return "red";
    if (task.priority === "Medium") return "orange";
    return "green";
  };

  const saveEdit = () => {
    editTask(task.id, newText);
    setIsEditing(false);
  };

  return (
  <div
    className={`card ${
      task.priority === "High"
        ? "high"
        : task.priority === "Medium"
        ? "medium"
        : "low"
    }`}
  >
    {isEditing ? (
      <>
        <input
          className="input"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
        <button className="small-btn" onClick={saveEdit}>
          Save
        </button>
      </>
    ) : (
      <p className="card-text" onClick={() => setIsEditing(true)}>
        {task.text}
      </p>
    )}

    <div className="card-buttons">
      {task.status !== "todo" && (
        <button
          className="small-btn"
          onClick={() => moveTask(task.id, "todo")}
        >
          To Do
        </button>
      )}

      {task.status !== "progress" && (
        <button
          className="small-btn"
          onClick={() => moveTask(task.id, "progress")}
        >
          Progress
        </button>
      )}

      {task.status !== "done" && (
        <button
          className="small-btn"
          onClick={() => moveTask(task.id, "done")}
        >
          Done
        </button>
      )}

      <button
        className="small-btn delete-btn"
        onClick={() => deleteTask(task.id)}
      >
        ❌
      </button>
    </div>
  </div>
);

}

export default TaskCard;
