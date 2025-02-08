import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FilterForm from "../../shared/Filter/FilterForm.jsx";
import SpaceList from "../../shared/Filter/SpaceList.jsx";

const SpaceFilterPage = () => {
  const [filters, setFilters] = useState({
    capacidad: "",
    precioDesde: "",
    precioHasta: "",
    estado: "",
    valoracion_media: "",
    categoria_nombre: "",
    equipamiento: "",
    orderBy: "",
    orderDirection: ""
  });

  const [categorias, setCategorias] = useState([]);
  const [espaciosFiltrados, setEspaciosFiltrados] = useState([]);
  const [equipamientos, setEquipamientos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
        setCategorias(response.data);
      } catch (error) {
        toast.error("Error al cargar categorías: " + error.message);
      }
    };
    fetchCategorias();
  }, []);

  useEffect(() => {
    const fetchEquipamientos = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/equipment`);
        setEquipamientos(response.data);
      } catch (error) {
        toast.error("Error al cargar equipamientos: " + error.message);
      }
    };
    fetchEquipamientos();
  }, []);

  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/spaces/filters`, {
        params: {
          ...filters,
          orderBy: filters.orderBy || 'id',
          orderDirection: filters.orderDirection || 'ASC'
        },
      });

      if (response.data && response.data.data) {
        setEspaciosFiltrados(response.data.data);
        toast.success("Espacios filtrados cargados correctamente.");
      } else {
        toast.error("Datos inesperados en la respuesta.");
      }
    } catch (error) {
      toast.error("Error al filtrar espacios: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <FilterForm
        filters={filters}
        categorias={categorias}
        equipamientos={equipamientos}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      {isLoading && <p>Cargando espacios...</p>}
      <SpaceList espaciosFiltrados={espaciosFiltrados} />
    </div>
  );
};

export default SpaceFilterPage;