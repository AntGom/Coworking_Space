import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get("/api/incidents", {
          headers: {
            Authorization: token,
          },
        });
        setIncidents(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener las incidencias:", err);
        toast.error("Hubo un error al obtener las incidencias");
        setLoading(false);
      }
    };

    fetchIncidents();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        Cargando incidencias...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center pt-6 pb-12 px-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold text-gray-800">
        Lista de Incidencias
      </h2>
      <div className="p-6 rounded-lg shadow-md max-w-4xl w-full">
        {incidents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {incidents.map((incident) => (
              <div
                key={incident.id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-2 text-center">
                  {incident.espacio_nombre}
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Fecha de Creación: </span>
                  {incident.fecha_creacion}
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Descripción:</span>{" "}
                  {incident.titulo}
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={() =>
                      navigate(`/user/incident-messages/${incident.id}`)
                    }
                    className="mt-4 px-4 py-2 bg-blue-500  hover:bg-blue-700 text-white rounded"
                  >
                    Ver Mensajes
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen bg-gray-100">
            No hay incidencias disponibles.
          </div>
        )}
      </div>
    </div>
  );
};

export default IncidentList;
