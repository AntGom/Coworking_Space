import SpaceForm from "../../shared/SpaceForm.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateSpace = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const handleCreateSubmit = async (id, formData, token) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/spaces`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const spaceId = response.data.data.id;

      if (photos.length > 0) {
        await uploadPhotos(spaceId, photos);
      }
      toast.success("Espacio creado");
      navigate("/space/spaces");
    } catch (error) {
      console.error(
        "Error al crear o actualizar el espacio:",
        error.response ? error.response.data : error.message
      );
      toast.error("Error al crear el espacio: " + error.response.data.mensaje);
    }
  };

  const handlePhotosChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  const uploadPhotos = async (spaceId, photos) => {
    const formData = new FormData();
    // eslint-disable-next-line no-unused-vars
    photos.forEach((file, index) => formData.append(`photo`, file));
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
      console.error("Error al subir las fotos:", error);
      toast.error("Error subiendo las fotos: " + error.response.data.mensaje);
    }
  };

  return (
    <>
      <SpaceForm
        onSubmit={handleCreateSubmit}
        onPhotosChange={handlePhotosChange}
        imagePreview={imagePreview}
      />
    </>
  );
};

export default CreateSpace;