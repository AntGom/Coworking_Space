import PropTypes from "prop-types";
import RatingStars from "../../shared/Filter/RatingStars";
import { useNavigate } from "react-router-dom";

const SpaceCard = ({ espacio }) => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;
  const imageUrl = `${BASE_URL}/${espacio.imagen}`;

  const goToSpace = (id) => {
    if (id) {
      navigate(`/space/get-space/${id}`);
    } else {
      console.error("No se proporcionó un ID válido");
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg flex flex-col">
      <div className="mb-4">
        <img
          src={
            espacio.imagen ? imageUrl : "https://via.placeholder.com/300x200"
          }
          alt={espacio.nombre}
          className="w-full h-48 rounded-lg object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-700 mb-1">
            {espacio.nombre}
          </h3>
          <p className="text-gray-600">{espacio.descripcion}</p>
        </div>
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-700 mb-1">
            Categoría
          </h3>
          <p className="text-gray-600">{espacio.categorias_nombre}</p>
        </div>
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-700 mb-1">
            Capacidad
          </h3>
          <p className="text-gray-600">{espacio.capacidad}</p>
        </div>
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-700 mb-1">Precio</h3>
          <p className="text-gray-600">${espacio.precio_espacio_completo}</p>
        </div>
        
        {/* Centrar Valoración y Estrellas */}
        <div className="flex flex-col items-center mt-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-1">
            Valoración media
          </h3>
          <RatingStars rating={parseFloat(espacio.valoracion_media)} />
        </div>
      </div>
      <div className="mt-auto flex justify-center">
        <button
          onClick={() => goToSpace(espacio.id)}
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mt-3"
        >
          Ver detalles
        </button>
      </div>
    </div>
  );
};

SpaceCard.propTypes = {
  espacio: PropTypes.shape({
    id: PropTypes.number.isRequired, // Asegúrate de incluir id aquí
    nombre: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    categorias_nombre: PropTypes.string.isRequired,
    capacidad: PropTypes.number.isRequired,
    precio_espacio_completo: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    estado: PropTypes.string.isRequired,
    valoracion_media: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    imagen: PropTypes.string,
  }).isRequired,
};

export default SpaceCard;
