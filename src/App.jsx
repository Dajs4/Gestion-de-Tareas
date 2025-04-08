import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskFormModal from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import TaskFilter from "./components/TaskFilter/TaskFilter";
import TaskStats from "./components/TaskStats/TaskStats";

function App() {
  // Modelo de datos inicial
  const initialTasks = [
    {
      id: uuidv4(),
      title: "Aprender React",
      description: "Estudiar los fundamentos de React",
      completed: false,
      createdAt: new Date(),
    },
  ];

  // Estados principales
  const [tasks, setTasks] = useState(() => {
    // Intenta cargar tareas desde localStorage
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });
  const [filter, setFilter] = useState("all"); // 'all', 'active', 'completed'
  const [editingTask, setEditingTask] = useState(null);
  // Estado para controlar la visibilidad del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Guardar tareas en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Función para abrir el modal de creación
  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  // Función para abrir el modal de edición
  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    // Opcional: Limpiar la tarea en edición después de un breve retraso
    // para evitar que se vea el cambio antes de que el modal se cierre
    setTimeout(() => setEditingTask(null), 200);
  };

  // Función para añadir una nueva tarea
  const addTask = (taskData) => {
    const newTask = {
      id: uuidv4(),
      title: taskData.title,
      description: taskData.description,
      completed: false,
      createdAt: new Date(),
    };
    setTasks([...tasks, newTask]);
  };

  // Función para actualizar una tarea existente
  const updateTask = (taskData) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskData.id ? { ...task, ...taskData } : task
      )
    );
  };

  // Función para eliminar una tarea
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Función para marcar como completada una tarea
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Filtrar tareas según el estado seleccionado
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true; // 'all'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 py-12 px-4">
      <div className="container mx-auto max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-violet-500 to-indigo-600 px-6 py-8 text-white">
          <h1 className="text-3xl font-bold text-center">Gestión de Tareas</h1>
          <p className="text-center text-indigo-100 mt-2">Organiza tu día de forma eficiente</p>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <TaskStats
              total={tasks.length}
              pending={tasks.filter((task) => !task.completed).length}
            />
            
            <button
              onClick={openCreateModal}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium px-5 py-2.5 rounded-full hover:from-violet-700 hover:to-indigo-700 transition shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Nueva Tarea
            </button>
          </div>

          <TaskFilter filter={filter} onFilterChange={setFilter} />

          <TaskList
            tasks={filteredTasks}
            onDelete={deleteTask}
            onToggleComplete={toggleComplete}
            onEdit={openEditModal}
          />

          {filteredTasks.length === 0 && (
            <div className="mt-10 text-center py-16 px-6 bg-gray-50 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="mt-4 text-gray-500">No hay tareas que mostrar</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de formulario */}
      <TaskFormModal
        onSubmit={editingTask ? updateTask : addTask}
        initialData={editingTask}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}

export default App;