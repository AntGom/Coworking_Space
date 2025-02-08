import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black text-white py-12 border-t-2 border-gray-700">
      <div className="container mx-auto flex flex-col items-center justify-between sm:flex-row">
        {/* Logo Section */}
        <div className="flex items-center mb-4 sm:mb-0">
          <img
            src="/logocoworkingrgb.png" // Ruta de tu logo
            alt="Logo"
            className="h-12 mr-3"
          />
        </div>
        
        {/* Contact Info */}
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <p className="mb-1">1234 Calle Ficticia, Ciudad Inventada, País</p>
          <p>Teléfono: (123) 456-7890</p>
        </div>
        
        {/* Social Media Links */}
        <div className="flex">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-2"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-2"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://www.whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-2"
          >
            <FaWhatsapp size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
