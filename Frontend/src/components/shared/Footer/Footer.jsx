import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black text-white py-8 border-t-2 border-gray-700">
      <section className="container mx-auto  mb-8 flex flex-row items-center justify-around flex-wrap  ">
        {/* Logo Section */}
        <div className="flex items-center mb-4">
          <img
            src="/logocoworkingrgb.png"
            alt="Logo"
            className="h-12 mr-3"
          />
        </div>
        
        {/* Info Contacto */}
        <div className="text-center sm:text-left mb-4 mt-4">
          <p className="mb-1">1234 Calle Ficticia, Ciudad Inventada, País</p>
          <p>Teléfono: (123) 456-7890</p>
        </div>
        
        {/* Redes Sociales */}
        <div className="flex ">
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
      </section>
      <div className="flex justify-center items-center text-center">
          <p>{new Date().getFullYear()}© Antonio Gómez Domínguez. Con ❤ desde Andalucía.</p>
        </div>
    </footer>
  );
}

export default Footer;