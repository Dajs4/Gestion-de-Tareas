import TaskItem from "../TaskItem/TaskItem";

function TaskList({ tasks, onDelete, onToggleComplete, onEdit }) {
  if (tasks.length === 0) {
    return null; // Ahora manejamos el estado vacío en App.jsx
  }

  return (
    <div className="mt-4 space-y-2">
      {/* Contenedor con animaciones para las tareas */}
      <div className="grid gap-2 auto-rows-max transition-all">
        {tasks.map((task, index) => (
          <div 
            key={task.id}
            className="animate-item"
            style={{ 
              animationDelay: `${index * 0.05}s`,
              opacity: 0,
              animation: 'fade-in 0.5s ease forwards'
            }}
          >
            <TaskItem
              task={task}
              onDelete={onDelete}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;