import { useState, useEffect } from "react";

function TaskFormModal({ onSubmit, initialData, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  // Si hay datos iniciales (modo edición), actualizar el estado
  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        title: initialData.title,
        description: initialData.description,
      });
    } else {
      // Reiniciar el formulario si no hay datos iniciales
      setFormData({
        id: null,
        title: "",
        description: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Limpiar error cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "El título es obligatorio";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
    
    // Solo resetear el formulario si no estamos en modo edición
    if (!initialData) {
      setFormData({
        id: null,
        title: "",
        description: "",
      });
    }
    
    // Cerrar el modal después de enviar
    onClose();
  };

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden transform transition-all duration-300"
        style={{
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          animation: 'modal-appear 0.3s ease-out forwards'
        }}
      >
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {initialData ? "Editar Tarea" : "Nueva Tarea"}
            </h2>
            <button 
              onClick={onClose}
              className="text-white hover:text-gray-200 focus:outline-none transition-transform hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="title">
              Título
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow ${
                errors.title ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
              placeholder="Ingresa el título de la tarea"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1.5 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.title}
              </p>
            )}
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="description">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
              placeholder="Ingresa una descripción (opcional)"
              rows="4"
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-300 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-5 py-2.5 rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md hover:shadow-lg"
            >
              {initialData ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskFormModal;