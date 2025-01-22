import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL ;

function UpdatePassword() {
  const { token } = useAuth();
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.oldPassword === passwords.newPassword) {
      toast.error(
        "La nueva contraseña no puede ser igual a la contraseña anterior. Por favor, elige una nueva contraseña."
      );
      return;
    }
    try {
      const userId = localStorage.getItem("userId");

      const payload = {
        userId: userId,
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
      };

      const response = await axios.post(
        `${API_URL}/users/password/update`,
        payload,
        {
          headers: { Authorization: token },
        }
      );

      console.log(response);

      toast.success("Contraseña actualizada con éxito");

      setTimeout(() => {
        navigate("/user/profile");
      }, 2000);
    } catch (error) {
      toast.error(
        "Error al actualizar la contraseña: " + error.response.data.mensaje
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-20">
      <h2 className="text-2xl font-bold mb-6">Actualizar Contraseña</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <div className="mb-4">
          <label htmlFor="oldPassword" className="block text-gray-700">
            Contraseña Anterior
          </label>
          <div className="relative">
            <input
              type={showOldPassword ? "text" : "password"}
              name="oldPassword"
              value={passwords.oldPassword}
              placeholder="Introduce tu contraseña anterior"
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600"
            >
              {showOldPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="newPassword" className="block text-gray-700">
            Nueva Contraseña
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              value={passwords.newPassword}
              placeholder="Introduce nueva contraseña"
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600"
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Actualizar Contraseña
        </button>
      </form>
    </div>
  );
}

export default UpdatePassword;
