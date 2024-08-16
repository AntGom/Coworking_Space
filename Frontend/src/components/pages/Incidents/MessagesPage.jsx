import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewMessage from "./NewMessage.jsx";
import {jwtDecode} from "jwt-decode";

// Función para obtener el ID del usuario logueado desde el token.
const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.id;
  } catch (err) {
    console.error("Error decodificando el token:", err);
    return null;
  }
};

const MessagesPage = () => {
  const { id } = useParams(); // ID de la incidencia.
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Obtiene el ID del usuario logueado
  const currentUserId = getUserIdFromToken();

  const bottomRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/incidents/messages/${id}`, {
          headers: {
            Authorization: token,
          },
        });
        setMessages(response.data);
        setLoading(false);
      } catch (err) {
        toast.error("Hubo un error al obtener los mensajes");
        setLoading(false);
      }
    };

    fetchMessages();
  }, [id, token]);

  const handleNewMessageSent = async () => {
    try {
      const response = await axios.get(`/api/incidents/messages/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      setMessages(response.data);
    } catch (err) {
      console.error(
        "Error al obtener los mensajes después de enviar uno nuevo:",
        err
      );
      toast.error("Hubo un error al actualizar los mensajes");
    }
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Cargando mensajes...
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between bg-gray-100 min-h-screen">
      <div className="pt-6 pb-12 px-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Mensajes</h2>
        {messages.length > 0 ? (
          <ul className="space-y-4">
            {messages.map((message) => (
              <li
                key={message.mensaje_id}
                className={`p-4 border-b border-gray-200 rounded shadow-sm ${
                  message.usuario_id === currentUserId
                    ? "bg-blue-100 ml-auto"
                    : "bg-white mr-auto"
                }`}
                style={{
                  maxWidth: "85%",
                  borderRadius: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems:
                    message.usuario_id === currentUserId
                      ? "flex-end"
                      : "flex-start",
                }}
              >
                <p className="font-bold text-sm">{message.username}</p>
                <p className="text-sm">{message.mensaje}</p>
                <p className="text-xs text-right w-full">
                  {message.fecha_creacion} - {message.hora_creacion}
                </p>
              </li>
            ))}
            <div ref={bottomRef} />
          </ul>
        ) : (
          <div>No hay mensajes para esta incidencia.</div>
        )}
      </div>
      <NewMessage incidentId={id} onMessageSent={handleNewMessageSent} />
    </div>
  );
};

export default MessagesPage;
