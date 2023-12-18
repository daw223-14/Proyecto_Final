import React, { useState, useEffect, useContext } from "react";
import "./../styles/SignupForm.css";
import axios from "./axios";
import { Link, useNavigate  } from "react-router-dom";
import { AppContext } from "./AppContext";
import Notification from "./../components/Notification";

function Insert() {
  const [formData, setFormData] = useState({
    nombre: "",
    genero: "",
    descripcion: "",
    marca: "",
    precio: "",
    cantidadVendido: "",
    fechaAñadido: "",
    rutaimg: "",
    rutaimghover: "",
    precio_anterior: ""
  });
  const [errores, setErrores] = useState([]);
  const [message, setMessage] = useState("");

  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  const closeNotification = () => {
    setShowNotification(false);
    setNotificationText("");
    setMessage("");
    if(signedUp){
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
    const { nombre, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [nombre]: newValue,
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
        if(responseData.message == "Signed up Successfully"){
          setSignedUp(true);
        }
      })
      .catch((error) => {
        console.error("Error submitting the form:", error);
      });
  };

  useEffect(() => {
    if (message !== "") {
      setNotificationText(message);
      setShowNotification(true);
    }
  }, [message]);


  return (
    <section className="signup full-block">
      <div className="container signup-content">
        <h2 className="signup-title">Nuevo producto</h2>
        <form id="signupForm" className="signup-form" onSubmit={handleSubmit}>
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
              <label htmlFor="genero">Genero </label>
              <input
                id="genero"
                type="text"
                placeholder="genero..."
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                required
              />
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
                nombre="marca"
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
              <label htmlFor="fechaAñadido">fechaañadido</label>
              <input
                id="fechaAñadido"
                type="date"
                placeholder="fechaañadido..."
                name="fechaAñadido"
                value={formData.fechaAñadido}
                onChange={handleChange}
                required
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
              <label htmlFor="rutaimghover">rutaimghover</label>
              <input
                id="rutaimghover"
                type="text"
                placeholder="rutaimghover..."
                name="rutaimghover"
                value={formData.rutaimghover}
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
                required
              />
            </div>
          </div>
          <button className="btn btn--form" type="submit" value="Signup">
            Regístrate
          </button>
        </form>
      </div>
      {showNotification && <Notification show={showNotification} onClose={closeNotification} text={notificationText} />}
    </section>
  );
}

export default Insert;

