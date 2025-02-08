import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ResetPass() {
  const [credentials, setCredentials] = useState({
    email: "",
    recoverPassCode: "",
    newPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(credentials.email)) {
      toast.error(
        "El correo electrónico ingresado no es válido. Por favor, verifica e intenta nuevamente."
      );
      return;
    }

    try {
      const resp = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/password/reset`,
        credentials
      );
      console.log(resp);
      toast.success("Recuperación de Contraseña Completa");
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } catch (error) {
      toast.error(
        "Hubo un error al recuperar la contraseña. Volviendo al envío de email de recuperación."
      );
      setTimeout(() => {
        navigate("/recoverPass");
      }, 3000);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-8">
      <h2 className="text-2xl font-bold mb-6">Cambiar Contraseña</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            placeholder="Introduce tu email"
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="recoverPassCode" className="block text-gray-700">
            Código de Recuperación
          </label>
          <input
            type="text"
            name="recoverPassCode"
            value={credentials.recoverPassCode}
            placeholder="Introduce Código de Recuperación"
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="newPassword" className="block text-gray-700">
            Contraseña Nueva
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              value={credentials.newPassword}
              placeholder="Introduce nueva Contraseña"
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Cambiar Contraseña
        </button>
      </form>
    </div>
  );
}

export default ResetPass;
