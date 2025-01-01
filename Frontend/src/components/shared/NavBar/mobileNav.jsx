import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useState, useRef, } from "react";

function MobileNav() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  // Función para alternar la apertura/cierre del menú
  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };


  return (
    <div className="flex items-center ml-auto">
      {/* Botón para abrir/cerrar el menú móvil */}
      <button
        className="sm:hidden text-white focus:outline-none"
        onClick={handleMenuToggle}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {menuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          )}
        </svg>
      </button>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div
          className="sm:hidden absolute top-full left-0 w-full bg-white text-black shadow-lg"
          ref={menuRef}
        >
          <nav className="flex flex-col space-y-2 p-4">
            {user ? (
              isAdmin ? (
                <>
                  <Link to="/space/create-space" className="flex hover:bg-gray-200 p-2 rounded" onClick={handleMenuToggle}>
                    <img
                      src="/crear_espacios_black.png"
                      alt="Crear espacios"
                      className="h-8 w-8 mr-2"
                    />
                    Crear espacios
                  </Link>
                  <Link to="/space/spaces" className="flex hover:bg-gray-200 p-2 rounded" onClick={handleMenuToggle}>
                    <img
                      src="/logo_ver_espacios_black.png"
                      alt="Ver Espacios"
                      className="h-8 w-8 mr-2"
                    />
                    Espacios Disponibles
                  </Link>
                  <Link to="/space/filter-spaces" className="flex hover:bg-gray-200 p-2 rounded" onClick={handleMenuToggle}>
                    <img
                      title="Busqueda Avanzada"
                      src="/logo_lupa_black.png"
                      alt="Admin Icon"
                      className="h-8 w-8 mr-2"
                    />
                    Busqueda Avanzada
                  </Link>
                  <Link to="/user/adminBookings" className="flex hover:bg-gray-200 p-2 rounded" onClick={handleMenuToggle}>
                    <img
                      src="/reserva_pendiente_black.png"
                      alt="Admin Icon"
                      className="h-8 w-8 mr-2"
                    />
                    Reservas Pendientes
                  </Link>
                  <Link to="/user/my-bookings" className="flex hover:bg-gray-200 p-2 rounded" onClick={handleMenuToggle}>
                    <img
                      title="Reservas"
                      src="/ver_reservas_black.png"
                      alt="Admin Icon"
                      className="h-8 w-8 mr-2"
                    />
                    Reservas
                  </Link>
                  <Link to="/user/incident-list" className="flex hover:bg-gray-200 p-2 rounded" onClick={handleMenuToggle}>
                    <img
                      src="/ver_incidencias_black.png"
                      alt="Admin Icon"
                      className="h-8 w-8 mr-2"
                    />
                    Incidencias
                  </Link>
                  <Link to="/user/profile" className="hover:bg-gray-200 p-2 rounded" onClick={handleMenuToggle}>
                    <img
                      src="/iconoPerfUser.png"
                      alt="Profile Icon"
                      className="h-7 w-7 inline mr-2"
                    />
                    Perfil
                  </Link>
                  <button
                    className="hover:bg-gray-200 p-2 rounded focus:outline-none"
                    onClick={() => {
                      navigate("/");
                      logout();
                      handleMenuToggle();
                    }}
                  >
                    <img
                      src="/logo_logout_black.png"
                      alt="Logout Icon"
                      className="h-8 w-8 inline mr-2"
                    />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/user/my-bookings" className="flex hover:bg-gray-200 p-2 rounded" onClick={handleMenuToggle}>
                    <img
                      title="Reservas"
                      src="/ver_reservas_black.png"
                      alt="Admin Icon"
                      className="h-8 w-8 mr-2"
                    />
                    <p className="pt-1">Mis Reservas</p>
                  </Link>
                  <Link to="/user/incident-list" className="flex hover:bg-gray-200 p-2 rounded" onClick={handleMenuToggle}>
                    <img
                      src="/ver_incidencias_black.png"
                      alt="Admin Icon"
                      className="h-8 w-8 mr-2"
                    />
                    <p className="pt-1">Incidencias</p>
                  </Link>
                  <Link to="/space/spaces" className="flex hover:bg-gray-200 p-2 rounded" onClick={handleMenuToggle}>
                    <img
                      src="/logo_ver_espacios_black.png"
                      alt="Admin Icon"
                      className="h-8 w-8 mr-3"
                    />
                    <p className="pt-1">Espacios Disponibles</p>
                  </Link>
                  <Link to="/space/filter-spaces" className="flex hover:bg-gray-200 p-2 rounded" onClick={handleMenuToggle}>
                    <img
                      src="/logo_lupa_black.png"
                      alt="Admin Icon"
                      className="h-8 w-8 mr-3"
                    />
                    <p className="pt-1">Busqueda Avanzada</p>
                  </Link>
                  <Link to="/user/profile" className="flex hover:bg-gray-200 p-2 rounded" onClick={handleMenuToggle}>
                    <img
                      src="/iconoPerfUser.png"
                      alt="Profile Icon"
                      className="h-8 w-8 inline mr-2"
                    />
                    <p className="pt-1">Perfil</p>
                  </Link>
                  <button
                    className="hover:bg-gray-200 p-2 rounded focus:outline-none"
                    onClick={() => {
                      navigate("/");
                      logout();
                      handleMenuToggle();
                    }}
                  >
                    <img
                      src="/logo_logout_black.png"
                      alt="Logout Icon"
                      className="h-8 w-8 inline mr-2"
                    />
                    Logout
                  </button>
                </>
              )
            ) : (
              <>
                <Link to="/auth/login" className="flex hover:bg-gray-200 p-2 rounded" onClick={handleMenuToggle}>
                  <img
                    src="/iniciar-sesion.png"
                    alt="Admin Icon"
                    className="h-8 w-8 mr-3"
                  />
                  <p className="pt-1">Log in</p>
                </Link>
                <Link to="/auth/register" className="flex hover:bg-gray-200 p-2 rounded" onClick={handleMenuToggle}>
                  <img
                    src="/agregar.png"
                    alt="Admin Icon"
                    className="h-8 w-8 mr-3"
                  />
                  <p className="pt-1">Sign Up</p>
                </Link>
                <Link to="/space/spaces" className="flex hover:bg-gray-200 p-2 rounded" onClick={handleMenuToggle}>
                  <img
                    src="/logo_ver_espacios_black.png"
                    alt="Admin Icon"
                    className="h-8 w-8 mr-3"
                  />
                  <p className="pt-1">Espacios Disponibles</p>
                </Link>
                <Link to="/space/filter-spaces" className="flex hover:bg-gray-200 p-2 rounded" onClick={handleMenuToggle}>
                  <img
                    src="/logo_lupa_black.png"
                    alt="Admin Icon"
                    className="h-8 w-8 mr-3"
                  />
                  <p className="pt-1">Busqueda Avanzada</p>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}

export default MobileNav;
