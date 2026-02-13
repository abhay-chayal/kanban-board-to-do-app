import TaskCard from "./TaskCard";

function Column({
  title,
  status,
  tasks,
  deleteTask,
  moveTask,
  editTask,
}) {
  return (
  <div className="column">
    <h3 className="column-title">{title}</h3>

    {tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          moveTask={moveTask}
          editTask={editTask}
        />
      ))}
  </div>
);

}

export default Column;
