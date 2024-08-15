import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import RatingStars from "./Filter/RatingStars.jsx";

function SpacesList() {
  const [spaces, setSpaces] = useState([]);
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await axios.get(`/api/spaces`);
        if (response.data && Array.isArray(response.data.data)) {
          const sortedSpaces = response.data.data.sort((a, b) => b.id - a.id);
          setSpaces(sortedSpaces);
        } else {
          console.error("Error en el formato de la data:", response.data);
          setSpaces([]);
        }
      } catch (error) {
        console.error("Error en el fetch de espacios:", error);
      }
    };

    fetchSpaces();
  }, [apiUrl]);

  const handleEditClick = (id) => {
    if (id) {
      navigate(`/space/update-space/${id}`);
    } else {
      console.error("No se proporcionó un ID válido");
    }
  };

  const goToSpace = (id) => {
    if (id) {
      navigate(`/space/get-space/${id}`);
    } else {
      console.error("No se proporcionó un ID válido");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 block mb-4 text-center">
        Éstos son nuestros Espacios:
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.isArray(spaces) && spaces.length > 0 ? (
          spaces.map((space) => (
            <li
              key={space.id}
              className="p-4 bg-white rounded-lg shadow-lg flex flex-col"
            >
              <div className="mb-4">
                <img
                  src={
                    space.imagen
                      ? `${apiUrl}/${space.imagen}`
                      : "https://via.placeholder.com/300x200"
                  }
                  alt={space.imagen}
                  className="w-full h-48 rounded-lg object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="mb-2">
                  <h3 className="text-lg font-semibold text-gray-700 mb-1">
                    Nombre
                  </h3>
                  <p className="text-gray-600">{space.nombre}</p>
                </div>
                <div className="mb-2">
                  <h3 className="text-lg font-semibold text-gray-700 mb-1">
                    Descripción
                  </h3>
                  <p className="text-gray-600">{space.descripcion}</p>
                </div>
                <div className="mb-2">
                  <h3 className="text-lg font-semibold text-gray-700 mb-1">
                    Categoría
                  </h3>
                  <p className="text-gray-600">{space.categorias_nombre}</p>
                </div>
                
                {/* Centrar Valoración y Estrellas */}
                <div className="flex flex-col items-center mt-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-1">
                    Valoración media
                  </h3>
                  <RatingStars rating={parseFloat(space.valoracion_media)} />
                </div>
              </div>

              <div className="mt-auto flex justify-center">
                <button
                  onClick={() => goToSpace(space.id)}
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mt-3"
                >
                  Ir
                </button>
              </div>
              {isAdmin && (
                <button
                  onClick={() => handleEditClick(space.id)}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mt-3"
                >
                  Editar
                </button>
              )}
            </li>
          ))
        ) : (
          <li className="text-gray-500 text-center">
            No hay espacios disponibles
          </li>
        )}
      </ul>
    </div>
  );
}

export default SpacesList;
