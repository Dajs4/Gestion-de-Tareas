function TaskItem({ task, onDelete, onToggleComplete, onEdit }) {
  // Función para formatear la fecha de creación
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es', { 
      day: '2-digit', 
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div
      className={`mb-4 rounded-xl border border-gray-100 transition-all duration-200 hover:shadow-md ${
        task.completed 
          ? "bg-gray-50 border-gray-200" 
          : "bg-white hover:border-indigo-200"
      }`}
    >
      <div className="p-5">
        <div className="flex items-start gap-3">
          <div className="pt-0.5">
            <button
              onClick={() => onToggleComplete(task.id)}
              className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
                task.completed 
                  ? "bg-green-500 border-green-500 text-white" 
                  : "border-gray-300 hover:border-indigo-400"
              }`}
            >
              {task.completed && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>

          <div className="flex-1">
            <h3
              className={`font-medium text-lg transition-all ${
                task.completed ? "line-through text-gray-500" : "text-gray-800"
              }`}
            >
              {task.title}
            </h3>

            {task.description && (
              <p
                className={`mt-2 transition-all ${
                  task.completed ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {task.description}
              </p>
            )}

            <div className="flex items-center mt-3 space-x-2 text-xs text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDate(task.createdAt)}</span>
            </div>
          </div>

          <div className="flex space-x-1">
            <button
              onClick={() => onEdit(task)}
              disabled={task.completed}
              className={`p-2 rounded-lg transition-colors ${
                task.completed 
                  ? "text-gray-400 cursor-not-allowed" 
                  : "text-indigo-600 hover:bg-indigo-50"
              }`}
              title={task.completed ? "No puedes editar una tarea completada" : "Editar tarea"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>

            <button
              onClick={() => onDelete(task.id)}
              className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              title="Eliminar tarea"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;