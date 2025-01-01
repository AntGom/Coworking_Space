import { Link } from "react-router-dom";

function Home() {
  const cards = [
    { title: "Oficinas Privadas", image: "/oficina-privada.jpg", hoverText: "Oficinas privadas equipadas con todo lo necesario para tu productividad", link: "/oficinas-privadas" },
    { title: "Salas de Reuniones", image: "/sala_runiones.jpg", hoverText: "Nuestras salas reuniones estan preparadas para adaptarse a tu necesidad" },
    { title: "Salas de Conferencias", image: "/sala-de-conferencias.jpg", hoverText: "Salas de conferencias ideales para tus presentaciones y eventos"},
    { title: "Espacios para Eventos", image: "/espacio-eventos.png", hoverText: "Espacios versátiles para cualquier tipo de evento"},
    { title: "Coworking", image: "/foto-coworking.jpeg", hoverText: "Áreas de coworking diseñadas para fomentar la colaboración y la creatividad" },
    { title: "Áreas de descanso", image: "/descanso-oficinas.jpg", hoverText: "Zonas de descanso cómodas para relajarte y recargar energías",  }
  ];

  return (
    <>
      <div className="relative max-h-[550px] overflow-hidden mb-">
        <video
          className="w-full max-h-[550px] object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/Coworking_Home_Promocional.mp4" type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>
      <div className="w-full h-[15vh] bg-blue-500 flex items-center justify-center mb-8">
        <h2 className="text-center text-white text-lg font-bold">Impulsa tu creatividad, comparte tu éxito.</h2>
      </div>
      <div className="container mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Link key={index} to="/space/spaces" className="relative h-60 bg-cover bg-center flex items-center justify-center text-white text-xl font-bold group" style={{ backgroundImage: `url(${card.image})` }}>
            <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-0 transition-opacity duration-500"></div>
            <span className="relative z-10 group-hover:opacity-0 transition-opacity duration-500">{card.title}</span>
            <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-500">
              <span className="text-white text-center">{card.hoverText}</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="container mx-auto mt-16 p-8 bg-gray-100 text-gray-900 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4">¿Qué es el coworking y cómo mejorar el rendimiento de las empresas?</h3>
        <p className="mb-8">El término coworking es un anglicismo que, traducido libremente, viene a significar «trabajando de forma compartida». Es decir, hacerlo en un espacio común. Esto ya nos da idea de algunas de sus ventajas, sobre todo en las grandes ciudades donde los alquileres son muy costosos. Por tanto, lugares de coworking en Madrid como los que ofrece Inspira son una magnífica elección.</p>

        <h4 className="text-xl font-semibold mb-2">¿En qué consiste exactamente el coworking?</h4>
        <p className="mb-4">Podemos definir esta figura como un sistema laboral que permite a profesionales de distintos sectores compartir un mismo lugar de trabajo tanto físico como tecnológico. De este modo, pueden desempeñar sus tareas propias al mismo tiempo que desarrollan proyectos conjunto</p>
        <p className="mb-4">Sin embargo, el coworking va más allá de ser un mero centro de negocio o una oficina compartida. Estos espacios se caracterizan, justamente, por su esencia colaborativa laboral. Las empresas o profesionales que los integran realizan sus propias tareas, pero también interaccionan entre ellos a través de los citados proyectos comunes.</p>
        <p className="mb-8">Por tanto, las ventajas de las oficinas de coworking sobrepasan el mero ahorro en el alquiler. Además, permiten establecer relaciones personales y profesionales dentro de una comunidad multidisciplinar. De hecho, también suelen contar con lugares donde relajarse y entablar contactos más informales. Pero también debe haber unas normas esenciales</p>

        <h4 className="text-xl font-semibold mb-2">Oficinas de coworking: ¿cómo funcionan?</h4>
        <p className="mb-4">El coworking en oficinas es una cesión de espacio para que trabajemos en un entorno común. Por tanto, se rige por unas normas básicas que deben seguirse para que la coexistencia sea correcta y fructífera. Estas premisas son las siguientes:</p>
        <ul className="list-disc list-inside mb-4">
          <li className="mb-2">Convivencia y respeto entre los miembros</li>
          <li className="mb-2">Libertad de acceso y zonas comunes que faciliten la conexión entre quienes forman parte del coworking.</li>
          <li className="mb-2">Existencia de un community builder o constructor de la comunidad. Este funciona como nexo que une a los distintos miembros y aporta iniciativas que ayudan a mejorar tanto el espacio como las condiciones de trabajo.</li>
          <li>Promoción de eventos y talleres de formación que, a su vez, multiplican las posibilidades de negocio</li>
        </ul>
        <p className="mb-8">Por tanto, el coworking es mucho más que el simple alquiler de salas para establecer la base de la empresa o para reuniones. Y esto se aprecia bien en todo lo que ofrecemos en Inspira.</p>

        
      </div>
    </>
  );
}

export default Home;
