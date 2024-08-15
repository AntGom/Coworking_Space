import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import RatingStars from "../../shared/Filter/RatingStars";

function SpaceDetail() {
  const { id } = useParams();
  const [space, setSpace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const response = await axios.get(`/api/spaces/${id}`);
        if (response.data && response.data.data) {
          setSpace(response.data.data);
        } else {
          console.error("Error en el formato de la data:", response.data);
          setError("Error en el formato de los datos recibidos.");
        }
      } catch (error) {
        console.error("Error en el fetch de espacios:", error);
        setError("No se pudo cargar la información del espacio.");
      } finally {
        setLoading(false);
      }
    };

    fetchSpace();
  }, [id]);

  const goToBooking = (id) => {
    if (id) {
      navigate(`/user/new-booking/${id}`);
    } else {
      console.error("No se proporcionó un ID válido");
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

  if (!space) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        No se encontraron detalles del espacio.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
        {space.nombre}
      </h2>
      <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl w-full grid grid-cols-1 gap-4">
        {space.imagenes && space.imagenes.length > 0 ? (
          <Carousel
            showThumbs
            dynamicHeight={true}
            showIndicators={true}
            showStatus={false}
          >
            {space.imagenes.map((imagen, index) => (
              <div key={index} className="relative">
                <img
                  src={`${apiUrl}/${imagen.filename}`}
                  alt={`Imagen ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/300x200")
                  }
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <img
            src="https://via.placeholder.com/300x200"
            alt="Placeholder"
            className="w-full h-48 rounded-lg object-cover"
          />
        )}
        <div className="mt-4 space-y-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              Descripción
            </h3>
            <p className="text-gray-600">{space.descripcion}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              Categoría
            </h3>
            <p className="text-gray-600">{space.categoria_nombre}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              Capacidad
            </h3>
            <p className="text-gray-600">{space.capacidad}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">Precio</h3>
            <p className="text-gray-600">{space.precio_espacio_completo}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              Dirección
            </h3>
            <p className="text-gray-600">{space.direccion}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              Equipamientos
            </h3>
            <ul className="list-disc list-inside text-gray-600">
              {space.equipamientos && space.equipamientos.length > 0 ? (
                space.equipamientos.map((equipamiento, index) => (
                  <li key={index}>{equipamiento}</li>
                ))
              ) : (
                <li>No hay equipamientos disponibles.</li>
              )}
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              Valoración media
            </h3>
            <RatingStars rating={parseFloat(space.valoracion_media)} />
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => goToBooking(space.id)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
}

export default SpaceDetail;
