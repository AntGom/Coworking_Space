import SpaceForm from "../../shared/SpaceForm.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateSpace = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const handleUpdateSubmit = async (id, formData, token, photos) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/spaces/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.status === 200 && response.data && response.data.data) {
        const spaceId = response.data.data.id;

        await uploadPhotos(spaceId, photos);
        toast.success("Espacio actualizado");
        navigate("/space/spaces");
      } else {
        toast.error("Respuesta inesperada del servidor");
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error(
        "Error al actualizar el espacio:",
        error.response ? error.response.data : error.message
      );
      toast.error(
        "Error al actualizar el espacio: " +
          (error.response?.data?.mensaje ||
            error.message ||
            "Error desconocido")
      );
    }
  };

  const handlePhotosChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      setPhotos((prevPhotos) => {
        const updatedPhotos = [...prevPhotos, ...files];

        return updatedPhotos;
      });
    }

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  const handleDeletePhoto = async (spaceId, photoId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/spaces/${spaceId}/photos/${photoId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setPhotos((prevPhotos) =>
        prevPhotos.filter((photo) => photo.id !== photoId)
      );
      toast.success("Foto borrada");
    } catch (error) {
      console.error("Error borrando la foto:", error);
      toast.error("Error al borrar la foto: " + error.response.data.message);
    }
  };

  const uploadPhotos = async (spaceId, files) => {
    if (!photos || !Array.isArray(files) || photos.length === 0) return;
    const formData = new FormData();
    photos.forEach((file) => formData.append(`photo`, file));
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/spaces/${spaceId}/photos`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      toast.success("Fotos subidas");
    } catch (error) {
      console.error("Error subiendo las fotos:", error);
      toast.error("Error subiendo las fotos: " + error.response.data.mensaje);
    }
  };

  return (
    <>
      <SpaceForm
        onSubmit={handleUpdateSubmit}
        onPhotosChange={handlePhotosChange}
        onDeletePhoto={handleDeletePhoto}
        photos={photos}
        imagePreview={imagePreview}
      />
    </>
  );
};

export default UpdateSpace;