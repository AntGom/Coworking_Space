import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../../shared/Notification/Notification";
import axios from "axios";

function Activate() {
  const [activationSuccess, setActivationSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [registrationCode, setRegistrationCode] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setRegistrationCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (registrationCode) {
      try {
        const response = await axios.put(
          `${
            import.meta.env.VITE_API_URL
          }/users/activate/${registrationCode}`
        );
        if (response.data.status === "ok") {
          setActivationSuccess(true);
          setMessage("Cuenta activada con éxito");
          setMessageType("success");
          setTimeout(() => {
            navigate("/auth/login");
          }, 2000);
        }
      } catch (error) {
        setMessage(
          error.response?.data?.message || "Error durante la activación"
        );
        setMessageType("error");
      }
    }
  };

  return (
    <div className="relative flex justify-center items-start min-h-screen bg-gray-200 px-4 sm:px-6 lg:px-8">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-lg"
        style={{
          backgroundImage: "url('/fondo_oficina.jpg')",
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-3xl w-full bg-white bg-opacity-90 shadow-lg rounded-lg p-8 sm:p-10 lg:p-12 mt-6 md:mt-8 lg:mt-10">
        {!activationSuccess ? (
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-6">
              <label
                htmlFor="registrationCode"
                className=" text-center block text-gray-700 font-bold mb-2"
              >
                Introduce tu Código de Registro
              </label>
              <input
                type="text"
                id="registrationCode"
                name="registrationCode"
                value={registrationCode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Activar Cuenta
            </button>
            {message && (
              <div className="mt-4">
                <Notification message={message} type={messageType} />
              </div>
            )}
          </form>
        ) : (
          <>
            <h2 className="text-4xl font-bold text-green-600 mb-6 text-center">
              ¡Cuenta activada con éxito!
            </h2>
            <h3 className="text-2xl text-gray-700 mb-4 text-center">
              Redirigiendo a Iniciar Sesion...
            </h3>
          </>
        )}
      </div>
    </div>
  );
}

export default Activate;
