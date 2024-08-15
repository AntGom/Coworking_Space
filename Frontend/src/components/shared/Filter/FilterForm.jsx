import PropTypes from "prop-types";

const FilterForm = ({
  filters,
  categorias,
  handleInputChange,
  handleSubmit,
}) => (
  <form
    onSubmit={handleSubmit}
    className="max-w-4xl mx-auto mt-4 p-6 bg-white rounded-lg shadow-md"
  >
    <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
      Búsqueda Avanzada
    </h1>
    <div className="flex flex-wrap gap-4 justify-center">
      <div className="w-full  md:w-1/3 lg:w-1/4">
        <label className="block mb-2 font-semibold text-gray-700">
          Capacidad:
        </label>
        <input
          name="capacidad"
          type="number"
          value={filters.capacidad}
          onChange={handleInputChange}
          placeholder="Capacidad mínima"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="w-full  md:w-1/3 lg:w-1/4">
        <label className="block mb-2 font-semibold text-gray-700">
          Precio Desde:
        </label>
        <input
          name="precioDesde"
          type="number"
          value={filters.precioDesde}
          onChange={handleInputChange}
          placeholder="Precio desde"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="w-full  md:w-1/3 lg:w-1/4">
        <label className="block mb-2 font-semibold text-gray-700">
          Precio Hasta:
        </label>
        <input
          name="precioHasta"
          type="number"
          value={filters.precioHasta}
          onChange={handleInputChange}
          placeholder="Precio hasta"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="w-full  md:w-1/3 lg:w-1/4">
        <label className="block mb-2 font-semibold text-gray-700">
          Valoración:
        </label>
        <input
          name="valoracion_media"
          type="number"
          value={filters.valoracion_media}
          onChange={handleInputChange}
          placeholder="Valoración media mínima"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="w-full  md:w-1/3 lg:w-1/4">
        <label className="block mb-2 font-semibold text-gray-700">
          Categoría:
        </label>
        <select
          name="categoria_nombre"
          value={filters.categoria_nombre}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccione categoría</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.nombre}>
              {cat.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full  md:w-1/3 lg:w-1/4">
        <label className="block mb-2 font-semibold text-gray-700">
          Ordenar Por:
        </label>
        <select
          name="orderBy"
          value={filters.orderBy}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccione columna</option>
          <option value="precio_espacio_completo">Precio</option>
          <option value="capacidad">Capacidad</option>
          <option value="valoracion_media">Valoración</option>
        </select>
      </div>

      <div className="w-full  md:w-1/3 lg:w-1/4">
        <label className="block mb-2 font-semibold text-gray-700">
          Dirección de Ordenación:
        </label>
        <select
          name="orderDirection"
          value={filters.orderDirection}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccione dirección</option>
          <option value="ASC">Ascendente</option>
          <option value="DESC">Descendente</option>
        </select>
      </div>

      <div className="pt-5 w-full  md:w-1/3 lg:w-1/4">
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mt-3"
        >
          Filtrar
        </button>
      </div>
    </div>
  </form>
);

FilterForm.propTypes = {
  filters: PropTypes.shape({
    capacidad: PropTypes.string,
    precioDesde: PropTypes.string,
    precioHasta: PropTypes.string,
    estado: PropTypes.string,
    valoracion_media: PropTypes.string,
    categoria_nombre: PropTypes.string,
    equipamiento: PropTypes.string,
    orderBy: PropTypes.string,
    orderDirection: PropTypes.string,
  }).isRequired,
  categorias: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
    })
  ).isRequired,
  equipamientos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default FilterForm;
