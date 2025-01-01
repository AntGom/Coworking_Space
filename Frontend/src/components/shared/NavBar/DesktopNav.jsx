/* eslint-disable no-unused-vars */

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useState, useRef, useEffect } from "react";

function DesktopNav() {
    const { user, isAdmin, logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [reservasMenuOpen, setReservasMenuOpen] = useState(false); 
    const menuRef = useRef();
    const reservasMenuRef = useRef(); 
  
    const handleMenuToggle = () => {
      setMenuOpen(!menuOpen);
    };

    const handleReservasMenuToggle = () => {
      setReservasMenuOpen(!reservasMenuOpen);
    };
  
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (reservasMenuRef.current && !reservasMenuRef.current.contains(event.target)) {
        setReservasMenuOpen(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
    const [isScrolled, setIsScrolled] = useState(false);
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    return (
      <div className="flex items-center space-x-4">
        {/* Desktop navigation */}
        <nav className="hidden sm:flex items-center space-x-4">
          {user ? (
            isAdmin ? (
              <>
                <div className="relative" ref={menuRef}>
                  <button
                    className="flex items-center hover:text-gray-400 focus:outline-none"
                    onClick={handleMenuToggle}
                  >
                    <img
                      title="Espacios"
                      src="/logo_espacios_white.jpg"
                      alt="Admin Icon"
                      className="h-11 w-11"
                    />
                  </button>
                  {menuOpen && (
                    <div className="absolute right-0 mt-4 w-60 bg-white text-black rounded-md shadow-lg">
                      <Link
                        to="/space/create-space"
                        className="flex px-4 py-2 hover:bg-gray-200"
                      >
                        <img
                          src="/crear_espacios_black.png"
                          alt="Crear espacios"
                          className="h-8 w-8 mr-2"
                        />
                        Crear espacios
                      </Link>
                      <Link
                        to="/space/spaces"
                        className="flex  px-4 py-2 hover:bg-gray-200"
                      >
                        <img
                          src="/logo_ver_espacios_black.png"
                          alt="Ver Espacios"
                          className="h-8 w-8 mr-2"
                        />
                        Espacios Disponibles
                      </Link>
                      <Link
                        to="/space/filter-spaces"
                        className="flex px-4 py-2 hover:bg-gray-200"
                      >
                        <img
                          title="Busqueda Avanzada"
                          src="/logo_lupa_black.png"
                          alt="Admin Icon"
                          className="h-8 w-8 mr-2"
                        />
                        Busqueda Avanzada
                      </Link>
                    </div>
                  )}
                </div>
                <div className="relative" ref={reservasMenuRef}>
                  <button
                    className="flex items-center hover:text-gray-400 focus:outline-none"
                    onClick={handleReservasMenuToggle}
                  >
                    <img
                      title="Reservas"
                      src="/reservas_white.png"
                      alt="Admin Icon"
                      className="h-11 w-11"
                    />
                  </button>
                  {reservasMenuOpen && (
                    <div className="absolute right-0 mt-4 w-60 bg-white text-black rounded-md shadow-lg">
                      <Link
                        to="/user/my-bookings"
                        className="flex px-4 py-2 hover:bg-gray-200"
                      >
                        <img
                      title="Reservas"
                      src="/ver_reservas_black.png"
                      alt="Admin Icon"
                      className="h-8 w-8 mr-2"
                    />
                        Reservas
                      </Link>
                      <Link
                        to="/user/incident-list"
                        className="flex px-4 py-2 hover:bg-gray-200"
                      >
                        <img
                      src="/ver_incidencias_black.png"
                      alt="Admin Icon"
                      className="h-8 w-8 mr-2"
                    />
                        Incidencias
                      </Link>
                      <Link
                        to="/user/adminBookings"
                        className="flex px-4 py-2 hover:bg-gray-200"
                      >
                        <img
                          src="/reserva_pendiente_black.png"
                          alt="Admin Icon"
                          className="h-8 w-8 mr-2"
                        />
                        Reservas Pendientes
                      </Link>
                    </div>
                  )}
                </div>
                <Link to="/user/profile" className="hover:text-gray-400 focus:outline-none">
                  <img
                    title="Perfil de Usuario"
                    src="/iconoPerfUser.png"
                    alt="Profile Icon"
                    className="h-11 w-11"
                  />
                </Link>
                <Link to="/" className="hover:text-gray-400 focus:outline-none" onClick={() => {
                    navigate("/");
                    logout();
                  }}>
                  <img
                    title="Logout"
                    src="/logo_logout.png"
                    alt="Logout Icon"
                    className="h-11 w-11"
                  />
                </Link>
              </>
            ) : (
              <>
                <div className="relative" ref={menuRef}>
                  <button
                    className="flex items-center hover:text-gray-400 focus:outline-none"
                    onClick={handleMenuToggle}
                  >
                    <img
                      title="Espacios"
                      src="/logo_espacios_white.jpg"
                      alt="Admin Icon"
                      className="h-11 w-11"
                    />
                  </button>
                  {menuOpen && (
                    <div className="absolute right-0 mt-4 w-60 bg-white text-black rounded-md shadow-lg">
                      <Link
                        to="/space/spaces"
                        className="flex px-4 py-2 hover:bg-gray-200"
                      >
                        <img
                          title="Espacios"
                          src="/logo_ver_espacios_black.png"
                          alt="Admin Icon"
                          className="h-8 w-8 mr-2"
                        />
                        Espacios Disponibles
                      </Link>
                      <Link
                        to="/space/filter-spaces"
                        className="flex px-4 py-2 hover:bg-gray-200"
                      >
                        <img
                          title="Busqueda Avanzada"
                          src="/logo_lupa_black.png"
                          alt="Admin Icon"
                          className="h-8 w-8 mr-2"
                        />
                        Busqueda Avanzada
                      </Link>
                    </div>
                  )}
                </div>
                <div className="relative" ref={reservasMenuRef}>
                  <button
                    className="flex items-center hover:text-gray-400 focus:outline-none"
                    onClick={handleReservasMenuToggle}
                  >
                    <img
                      title="Reservas"
                      src="/reservas_white.png"
                      alt="Admin Icon"
                      className="h-11 w-11"
                    />
                  </button>
                  {reservasMenuOpen && (
                    <div className="absolute right-0 mt-4 w-60 bg-white text-black rounded-md shadow-lg">
                      <Link
                        to="/user/my-bookings"
                        className="flex px-4 py-2 hover:bg-gray-200"
                      >
                        <img
                      title="Reservas"
                      src="/ver_reservas_black.png"
                      alt="Admin Icon"
                      className="h-8 w-8 mr-2"
                    />
                       Mis Reservas
                      </Link>
                      <Link
                        to="/user/incident-list"
                        className="flex px-4 py-2 hover:bg-gray-200"
                      >
                        <img
                      src="/ver_incidencias_black.png"
                      alt="Admin Icon"
                      className="h-8 w-8 mr-2"
                    />
                       Incidencias
                      </Link>
                    </div>
                  )}
                </div>
                <Link to="/user/profile" className="hover:text-gray-400 focus:outline-none">
                  <img
                    title="Perfil de Usuario"
                    src="/iconoPerfUser.png"
                    alt="Perfil de Usuario"
                    className="h-11 w-11"
                  />
                </Link>
                <Link to="/" className="hover:text-gray-400 focus:outline-none" onClick={() => {
                    navigate("/");
                    logout();
                  }}>
                  <img
                    title="Logout"
                    src="/logo_logout.png"
                    alt="Logout Icon"
                    className="h-11 w-11"
                  />
                </Link>
              </>
            )
          ) : (
            <>
              <Link
                to="/space/filter-spaces"
                className="block px-4 py-2 hover:text-gray-400"
              >
                <img
                  title="Busqueda Avanzada"
                  src="/logo_lupa_white.png"
                  alt="Admin Icon"
                  className="h-11 w-11"
                />
              </Link>
              <Link
                to="/space/spaces"
                className="block px-4 py-2 hover:text-gray-400"
              >
                <img
                  title="Espacios Disponibles"
                  src="/logo_ver_espacios_white.jpg"
                  alt="Espacios Disponibles"
                  className="h-11 w-11"
                />
              </Link>
              <div className="relative" ref={menuRef}>
                <button
                  className="flex items-center hover:text-gray-400 focus:outline-none"
                  onClick={handleMenuToggle}
                >
                  <img
                    title="Account"
                    src="/iconoPerfUser.png"
                    alt="Perfil de Usuario"
                    className="h-11 w-11"
                  />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                    <Link
                      to="/auth/login"
                      className=" flex px-4 py-2 hover:bg-gray-200"
                    >
                      <img
                      src="/iniciar-sesion.png"
                      alt="Admin Icon"
                      className="h-8 w-8 mr-3"
                    />
                      Iniciar Sesión
                    </Link>
                    <Link
                      to="/auth/register"
                      className=" flex px-4 py-2 hover:bg-gray-200"
                    >
                      <img
                      src="/agregar.png"
                      alt="Admin Icon"
                      className="h-8 w-8 mr-3"
                    />
                      Registrarse
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
        </nav>
      </div>
    );
}

export default DesktopNav;
