import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function PendingBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const imageUrl = 'https://coworking-space-back.onrender.com/uploads/';


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`/api/bookings/adminBookings`, {
          headers: {
            Authorization: token,
          },
        });
        if (response.data && response.data.data) {
          setBookings(response.data.data);
        } else {
          console.error("Error en el formato de la data:", response.data);
          setError("Error en el formato de los datos recibidos.");
          toast.error("Error en el formato de los datos recibidos.");
        }
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
        setError("No se pudo cargar la información de las reservas.");
        toast.error("No se pudo cargar la información de las reservas.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [apiUrl, token]);

  useEffect(() => {
    // Maneja la redirección después de que las reservas hayan sido actualizadas.
    if (shouldRedirect) {
      navigate("/user/profile");
      toast.success(`No tienes reservas pendientes de revisar`);
    }
  }, [shouldRedirect, navigate]);

  const updateBookingStatus = async (espacioID, newStatus) => {
    try {
      await axios.post(
        `/api/bookings/reservation/${espacioID}/status`,
        { estado: newStatus },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success(`Reserva actualizada a ${newStatus}`);
      setBookings((prevBookings) => {
        const updatedBookings = prevBookings.map((booking) =>
          booking.id === espacioID ? { ...booking, estado: newStatus } : booking
        );
        // Verifica si no quedan reservas pendientes.
        if (updatedBookings.every(booking => booking.estado !== 'pendiente')) {
          setShouldRedirect(true); // Activa la redirección.
        }
        return updatedBookings;
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error(`Error al actualizar la reserva: ${errorMessage}`);
      toast.error(`Error al actualizar la reserva: ${errorMessage}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        Cargando...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        {error}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      navigate("/user/profile"),
      toast.success(`No tienes reservas pendientes de revisar`)
    );
  }

  return (
    <div className="flex flex-col items-center pt-6 pb-12 px-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold text-gray-800 ">Reservas Pendientes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6  rounded-lg shadow-md max-w-6xl w-full">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-lg shadow-md p-6 mb-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mr-4">
                {booking.espacio_nombre}
              </h3>
              <img
                src={booking.espacio_imagen ? `${imageUrl}/${booking.espacio_imagen}` : "https://via.placeholder.com/300x200"}
                alt={booking.espacio_nombre}
                className="w-20 h-20 rounded-lg object-cover"
              />
            </div>
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-semibold">Fecha de inicio: </span>
              {booking.fecha_inicio}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-semibold">Fecha de fin: </span>
              {booking.fecha_fin}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-semibold">Estado: </span>
              {booking.estado}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-semibold">Observaciones: </span>
              {booking.observaciones}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-semibold">Usuario: </span>
              {booking.usuario_username}
            </p>
            <div className="flex justify-around mt-4">
              <button
                onClick={() => updateBookingStatus(booking.id, "reservado")}
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              >
                Aceptar
              </button>
              <button
                onClick={() => updateBookingStatus(booking.id, "cancelada")}
                className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
              >
                Rechazar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PendingBookings;
