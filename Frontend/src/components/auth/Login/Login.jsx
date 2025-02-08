import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/login", formState);

      const { token } = response.data.data;
      const { id } = response.data.data.user;
      localStorage.setItem("userId", id);
      login(token);

      toast.success("Inicio de sesión exitoso");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error(
          "Usuario no encontrado. Por favor, verifica tus credenciales."
        );
      } else if (error.response && error.response.status === 401) {
        toast.error(
          "El nombre de usuario no coincide con la contraseña proporcionada. Por favor, verifica tus credenciales."
        );
      } else {
        const errorMessage =
          error.response?.data?.message || "Error en el inicio de sesión";
        toast.error(errorMessage);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Iniciar sesión
      </h1>
      <div className="space-y-4">
        <input
          type="email"
          placeholder="E-mail"
          name="email"
          value={formState.email}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            name="password"
            value={formState.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Enviar
        </button>
        <p className="mt-4 text-center text-gray-700">
          ¿Aun no tienes una cuenta?{" "}
          <Link className="text-blue-800 underline" to="/auth/register">
            Registrate
          </Link>
        </p>
        <p className="mt-4 text-center text-gray-700">
          ¿Has olvidado tu contraseña?{" "}
          <Link className="text-blue-800 underline" to="/auth/recoverPass">
            Recuperala
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
