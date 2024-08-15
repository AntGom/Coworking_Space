import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";
import usePreventNumberInputScroll from "../../hooks/UsePreventScrollNumber.jsx";
import { FaRegTrashAlt } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_API_URL;

const SpaceForm = ({ onSubmit, onPhotosChange, photos, imagePreview }) => {
  const { isAdmin } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [formState, setFormState] = useState({
    nombre: "",
    descripcion: "",
    categoria_id: "",
    capacidad: "",
    precio_por_persona: "",
    precio_espacio_completo: "",
    direccion: "",
    estado: "libre", // Valor predeterminado
  });
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [spacePhotos, setSpacePhotos] = useState([]);
  usePreventNumberInputScroll();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories", {
          headers: { Authorization: token },
        });
        setCategories(response.data);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "Error al hacer el fetch de las categorías";
        setMessage(errorMessage);
        setMessageType("error");
      }
    };

    fetchCategories();
  }, [token]);

  useEffect(() => {
    if (id) {
      const fetchSpace = async () => {
        try {
          const response = await axios.get(`/api/spaces/${id}`, {
            headers: { Authorization: token },
          });
          const space = response.data.data;

          setFormState({
            nombre: space.nombre,
            descripcion: space.descripcion,
            categoria_id: space.categoria_id,
            capacidad: space.capacidad,
            precio_por_persona: space.precio_por_persona,
            precio_espacio_completo: space.precio_espacio_completo,
            direccion: space.direccion,
            estado: space.estado || "libre", // Si el estado es null o undefined, asigna "libre"
          });

          const photoDetails = space.imagenes.map((image) => ({
            url: `${BASE_URL}/${image.filename}`,
            id: image.id,
          }));
          setSpacePhotos(photoDetails);
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            "Error al hacer el fetch de los datos del espacio";
          setMessage(errorMessage);
          setMessageType("error");
        }
      };

      fetchSpace();
    }
  }, [id, token]);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({ ...formState, [name]: value });
  };

  const handleDeletePhoto = async (photoId) => {
    if (!photoId) {
      console.error("Sin photoId proporcionado");
      return;
    }

    try {
      const response = await axios.delete(
        `/api/spaces/${id}/photos/${photoId}`,
        {
          headers: { Authorization: token },
        }
      );
      console.log(`Delete response:`, response);
      setSpacePhotos((prevPhotos) =>
        prevPhotos.filter((photo) => photo.id !== photoId)
      );
    } catch (error) {
      console.error("Error al eliminar la foto:", error);
      const errorMessage =
        error.response?.data?.message || "Error al eliminar la foto";
      setMessage(errorMessage);
      setMessageType("error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) {
        throw new Error("Acceso denegado: solo administradores");
      }
      const jsonFormData = JSON.stringify(formState);
      await onSubmit(id, jsonFormData, token, photos);
      resetForm();
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error al enviar el formulario";
      setMessage(errorMessage);
      setMessageType("error");
    }
  };

  const resetForm = () => {
    setFormState({
      nombre: "",
      descripcion: "",
      categoria_id: "",
      capacidad: "",
      precio_por_persona: "",
      precio_espacio_completo: "",
      direccion: "",
      estado: "libre", // Reinicia a "libre" al resetear el formulario
    });
    onPhotosChange([]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto m-8 p-6 bg-white rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {id ? "Editar Espacio" : "Crear Espacio"}
      </h1>
      <div className="space-y-4 ">
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formState.nombre}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label>
          Descripción:
          <textarea
            name="descripcion"
            value={formState.descripcion}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label>
          Categoría:
          <select
            name="categoria_id"
            value={formState.categoria_id}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Selecciona una categoría
            </option>
            {categories.map((category) => (
              <option
                selected={formState.categoria_id === category.id ? true : false}
                key={category.id}
                value={category.id}
              >
                {category.nombre}
              </option>
            ))}
          </select>
        </label>
        <label>
          Capacidad:
          <input
            type="number"
            name="capacidad"
            value={formState.capacidad}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label>
          Precio por persona:
          <input
            type="number"
            name="precio_por_persona"
            value={formState.precio_por_persona}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label>
          Precio espacio completo:
          <input
            type="number"
            name="precio_espacio_completo"
            value={formState.precio_espacio_completo}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label>
          Dirección:
          <input
            type="text"
            name="direccion"
            value={formState.direccion}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        
        <label>
          Fotos:
          <input
            type="file"
            multiple
            onChange={onPhotosChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-4 grid grid-cols-2 gap-4">
            {imagePreview.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Preview ${index}`}
                className="w-full h-40 object-cover rounded-md"
              />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {spacePhotos.map((photo) => (
              <div key={photo.id} className="relative">
                <img
                  src={photo.url}
                  alt={`Space photo ${photo.id}`}
                  className="w-full h-40 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleDeletePhoto(photo.id)}
                  className="absolute top-2 right-2 text-white bg-red-500 rounded-full  hover:bg-red-600 p-1"
                >
                  <FaRegTrashAlt className="w-6 h-6" title="Eliminar foto" />
                </button>
              </div>
            ))}
          </div>
        </label>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mt-3"
        >
          {id ? "Enviar cambios" : "Crear espacio"}
        </button>
      </div>
      {message && (
        <div
          className={`mt-4 ${
            messageType === "error" ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
};

SpaceForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onPhotosChange: PropTypes.func.isRequired,
  photos: PropTypes.array,
  imagePreview: PropTypes.array,
};

export default SpaceForm;
