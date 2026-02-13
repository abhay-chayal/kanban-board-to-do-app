import { useState, useEffect } from "react";
import Column from "./components/Column";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("kanbanTasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("Low");

  //  Save to localStorage
  useEffect(() => {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks]);

  //  Add Task
  const addTask = () => {
    if (!taskText.trim()) return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      status: "todo",
      priority: priority,
    };

    setTasks([...tasks, newTask]);
    setTaskText("");
  };

  //  Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  //  Move Task
  const moveTask = (id, newStatus) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, status: newStatus } : t
      )
    );
  };

  //  Edit Task
  const editTask = (id, newText) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, text: newText } : t
      )
    );
  };

  return (
  <div className="app-container">
    <h1 className="app-title">Kanban Task Board</h1>

    {/* Add Task */}
    <div className="add-task-bar">
      <input
        className="input"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter task..."
      />

      <select
        className="select"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button className="btn" onClick={addTask}>
        Add Task
      </button>
    </div>

    {/* Columns */}
    <div className="board">
      <Column
        title="To Do"
        status="todo"
        tasks={tasks}
        deleteTask={deleteTask}
        moveTask={moveTask}
        editTask={editTask}
      />

      <Column
        title="In Progress"
        status="progress"
        tasks={tasks}
        deleteTask={deleteTask}
        moveTask={moveTask}
        editTask={editTask}
      />

      <Column
        title="Done"
        status="done"
        tasks={tasks}
        deleteTask={deleteTask}
        moveTask={moveTask}
        editTask={editTask}
      />
    </div>
  </div>
);

}

export default App;
