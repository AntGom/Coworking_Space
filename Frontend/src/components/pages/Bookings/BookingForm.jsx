import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const BASE_URL = import.meta.env.VITE_API_URL;

function BookingForm({ spaceId, onBookingSuccess }) {
  const [formData, setFormData] = useState({
    fecha_inicio: "",
    fecha_fin: "",
    observaciones: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${BASE_URL}/bookings/create`,
        {
          usuario_id: userId,
          espacio_id: spaceId,
          tipo: "espacio_completo",
          fecha_inicio: formData.fecha_inicio,
          fecha_fin: formData.fecha_fin,
          observaciones: formData.observaciones,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.status === "ok") {
        toast.success("Reserva creada con éxito!");
        onBookingSuccess(); // Llama a la función de newBooking como prop si Ok.
      } else {
        toast.error("No se pudo realizar la reserva.");
      }
    } catch (err) {
      toast.error("No se pudo realizar la reserva.");
      console.error("Error en la reserva:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center bg-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
        Formulario de Reserva
      </h2>
      <div className="p-6 bg-white rounded-lg shadow-md max-w-md w-full">
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fecha_inicio" className="block text-gray-700">
              Fecha de Inicio
            </label>
            <input
              type="date"
              id="fecha_inicio"
              name="fecha_inicio"
              value={formData.fecha_inicio}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="fecha_fin" className="block text-gray-700">
              Fecha de Fin
            </label>
            <input
              type="date"
              id="fecha_fin"
              name="fecha_fin"
              value={formData.fecha_fin}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="observaciones" className="block text-gray-700">
              Observaciones
            </label>
            <textarea
              id="observaciones"
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              rows="4"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Reservando..." : "Reservar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

BookingForm.propTypes = {
  spaceId: PropTypes.number.isRequired,
  onBookingSuccess: PropTypes.func.isRequired,
};

export default BookingForm;
