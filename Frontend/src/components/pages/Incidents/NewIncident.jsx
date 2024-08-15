import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function NewIncident() {
  const [titulo, setTitulo] = useState("");
  const [categoriaIncidenciaId, setCategoriaIncidenciaId] = useState(""); // Inicialmente vacío
  const location = useLocation();
  const navigate = useNavigate();

  const { state } = location;
  const bookingId = state?.bookingId;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (categoriaIncidenciaId === "") {
      toast.error("Por favor, seleccione una categoría.");
      return;
    }

    try {
      await axios.post(
        `/api/incidents/create`,
        {
          reserva_id: bookingId,
          usuario_id: localStorage.getItem("userId"),
          categoria_incidencia_id: categoriaIncidenciaId,
          titulo: titulo,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      toast.success("Incidencia creada correctamente");
      navigate("/user/my-bookings");
    } catch (error) {
      const errorMessage = error.response?.data?.mensaje || error.message;
      console.error("Error al crear la incidencia:", errorMessage);
      toast.error(` ${errorMessage}`);
    }
  };

  return (
    <div className="flex flex-col items-center pt-6 pb-12 px-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        ¿Cómo podemos ayudarte?
      </h2>
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded-lg shadow-md max-w-md w-full"
      >
        <div className="mb-4">
          <label
            htmlFor="titulo"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Descripción
          </label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="categoria"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Categoría
          </label>
          <select
            id="categoria"
            value={categoriaIncidenciaId}
            onChange={(e) => setCategoriaIncidenciaId(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            required
          >
            <option value="" disabled>
              Seleccione el tipo de incidencia
            </option>
            <option value={1}>Electricidad</option>
            <option value={2}>Mobiliario</option>
            <option value={3}>Limpieza</option>
            <option value={5}>Incidencias</option>
            <option value={4}>Otros</option>
          </select>
        </div>
        <div className="flex flex-col items-center mb-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Crear Incidencia
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewIncident;
