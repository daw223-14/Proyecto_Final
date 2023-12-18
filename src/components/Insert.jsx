import React, { useState, useEffect, useContext } from "react";
import "./../styles/SignupForm.css";
import axios from "./axios";
import { Link, useNavigate  } from "react-router-dom";
import { AppContext } from "./AppContext";
import Notification from "./../components/Notification";

function InsertForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    genero: "",
    descripcion: "",
    marca: "",
    precio: "",
    cantidadVendido: "",
    fechaAñadido: "",
    rutaimg: "",
    precio_anterior: ""
  });
  const [errores, setErrores] = useState([]);
  const [message, setMessage] = useState("");
  const [insertok, setInsertok] = useState(false);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  const closeNotification = () => {
    setShowNotification(false);
    setNotificationText("");
    setMessage("");
    if(insertok){
      navigate("/admin");
    }
  }; 

  const navigate  = useNavigate();
  const { isUserLogged, setIsUserLogged } = useContext(AppContext);

  useEffect(() => {
    if (isUserLogged) {
      navigate("/");
    }
  }, [isUserLogged, navigate]);

  function validation(){  
    let errores = [];
    if (!/^[a-zA-Z\s]+$/.test(formData.nombre)) {
      errores.push("Nombre Incorrecto. Por favor, introduce un nombre sin carácteres especiales.");
    }  
    return errores;
}

const handleChange = (e) => {
  const { name, value} = e.target;

  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: value,
  }));
};
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const validationErrors = validation();
  
    setErrores(validationErrors); 
  
    if (validationErrors.length > 0) {
      setNotificationText(validationErrors);
      setShowNotification(true);
      return;
    }
  
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
  
    axios
      .post("/insert.php", data)
      .then((response) => {
        const responseData = response.data;
        setMessage(responseData.message);
        setNotificationText(response.data.message);
        setShowNotification(true);
        if(responseData.message == "Producto añadido"){
          setInsertok(true);
        }
      })
      .catch((error) => {
        console.error("Error al añadir el formulario: ", error);
      });
  };

  useEffect(() => {
    if (message !== "") {
      setNotificationText(message);
      setShowNotification(true);
    }
  }, [message]);

  return (
    <section className="insert full-block">
      <div className="container insert-content">
        <h2 className="insert-title">Nuevo producto</h2>
        <form id="insertForm" className="insert-form" onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                type="text"
                placeholder="Nombre..."
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div>
            <label htmlFor="genero">Género</label>
            <select
              id="genero"
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona el género</option>
              <option value="mujer">Mujer</option>
              <option value="hombre">Hombre</option>
              <option value="niños">Niños</option>
            </select>
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="descripcion">Descripcion </label>
              <input
                id="descripcion"
                type="text"
                placeholder="descripcion..."
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="marca">marca</label>
              <input
                id="marca"
                type="text"
                placeholder="Número de marca..."
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="precio">precio</label>
              <input
                id="precio"
                type="number"
                placeholder="precio..."
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="cantidadVendido">cantidadVendido</label>
              <input
                id="cantidadVendido"
                type="number"
                placeholder="Repite la precio..."
                name="cantidadVendido"
                value={formData.cantidadVendido}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="fechaAñadido">Fecha de añadido:</label>
              <input
                id="fechaAñadido"
                type="text"
                name="fechaAñadido"
                value={formData.fechaAñadido}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="rutaimg">rutaimg</label>
              <input
                id="rutaimg"
                type="text"
                placeholder="rutaimg..."
                name="rutaimg"
                value={formData.rutaimg}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="precio_anterior">precio_anterior</label>
              <input
                id="precio_anterior"
                type="text"
                placeholder="precio_anterior..."
                name="precio_anterior"
                value={formData.precio_anterior}
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="btn btn--form" type="submit" value="Insert">
            Insertar
          </button>
        </form>
      </div>
      {showNotification && <Notification show={showNotification} onClose={closeNotification} text={notificationText} />}
    </section>
  );
}

export default InsertForm;

