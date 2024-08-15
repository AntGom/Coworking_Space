import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewMessage from "./NewMessage.jsx";
import { jwtDecode } from "jwt-decode";

// Función para obtener el ID del usuario logueado desde el token.
const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.id; // Asegúrate de que el ID del usuario está en el campo correcto
  } catch (err) {
    console.error("Error decodificando el token:", err);
    return null;
  }
};

const MessagesPage = () => {
  const { id } = useParams(); // ID de la incidencia
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewMessage, setShowNewMessage] = useState(false);
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

  const handleNewMessageClick = () => {
    setShowNewMessage(!showNewMessage);
  };

  const handleNewMessageSent = async () => {
    setShowNewMessage(false);
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
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
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
    <div className="flex flex-col items-center pt-6 pb-12 px-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Mensajes</h2>
      {messages.length > 0 ? (
        <ul className="space-y-4">
          {messages.map((message) => (
            <li
              key={message.mensaje_id}
              className={`p-4 border-b border-gray-200 rounded shadow-sm ${
                message.usuario_id === currentUserId
                  ? "bg-blue-100  ml-auto"
                  : "bg-white  mr-auto"
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
              <p className="text-sm ">{message.mensaje}</p>
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
      {showNewMessage && (
        <div className="fixed bottom-16 right-6 max-w-lg p-4 bg-white shadow-lg rounded">
          <NewMessage incidentId={id} onMessageSent={handleNewMessageSent} />
        </div>
      )}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={handleNewMessageClick}
          className={`px-4 py-2 text-white rounded ${
            showNewMessage ? "" : "bg-blue-500 hover:bg-blue-700"
          }`}
        >
          {showNewMessage ? "" : "Nuevo Mensaje"}
        </button>
      </div>
    </div>
  );
};

export default MessagesPage;
