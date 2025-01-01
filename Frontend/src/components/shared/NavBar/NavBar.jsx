/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useState, useRef, useEffect } from "react";
import MobileNav from "./mobileNav.jsx";
import DesktopNav from "./DesktopNav.jsx";

function NavBar() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
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
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        window.removeEventListener("scroll", handleScroll);
      };
    }, [])
  return (
    <header   className={`bg-black text-white sticky top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-5'} `} >
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <img
            src="/logocoworkingrgb.png"
            alt="logo"
            className="h-12 w-auto object-contain rounded-md shadow-sm cursor-pointer"
            onClick={() => navigate('/')}
          />
        </div>
        <MobileNav/>
        <DesktopNav/>
      </div>
    </header>
  );
}

export default NavBar;
