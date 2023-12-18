import React, { useState, useEffect, useContext } from "react";
import "./../styles/SignupForm.css";
import axios from "./axios";
import { Link, useNavigate  } from "react-router-dom";
import { AppContext } from "./AppContext";
import Notification from "./../components/Notification";

function Insert() {
  const [formData, setFormData] = useState({
    nombre: "",
    username: "",
    correo: "",
    telefono: "",
    contraseña: "",
    contraseña2: "",
    direccion: "",
    terminos: false,
  });
  const [errores, serErrores] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [signedUp, setSignedUp] = useState(false);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  const closeNotification = () => {
    setShowNotification(false);
    setNotificationText("");
    setMensaje("");
    if(signedUp){
      navigate("/login");
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
    if (!formData.terminos) {
      errores.push("* Tienes que aceptar los términos y condiciones");
    }
  
    if (!/^[a-zA-Z\s]+$/.test(formData.nombre)) {
      errores.push("Nombre Incorrecto. Por favor, introduce un nombre sin carácteres especiales.");
    }
  
    if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(formData.username)) {
      errores.push("Invalid username. It must start with a letter and can contain only letters and numbers.");
    }
  
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.correo) || formData.correo.length > 70) {
      errores.push("Invalid correo. correo should be a valid direccion and cannot exceed 70 characters.");
    }
  
    if (!/^\d{1,70}$/.test(formData.telefono) || formData.telefono.length > 70) {
      errores.push("Invalid telefono number. telefono number should only contain digits and cannot exceed 70 characters.");
    }
  
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/.test(formData.contraseña)) {
      errores.push("Invalid contraseña. contraseña should contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.");
    }
  
    if (formData.contraseña !== formData.contraseña2) {
      errores.push("Passwords do not match.");
    }
  
    if (formData.direccion.length > 128) {
      errores.push("direccion exceeds the maximum length of 128 characters.");
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
  
    serErrores(validationErrors); 
  
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
      .post("/signup.php", data)
      .then((response) => {
        const responseData = response.data;
        setMensaje(responseData.mensaje);
        setNotificationText(response.data.mensaje);
        setShowNotification(true);
        if(responseData.mensaje == "Signed up Successfully"){
          setSignedUp(true);
        }
      })
      .catch((error) => {
        console.error("Error submitting the form:", error);
      });
  };

  useEffect(() => {
    if (mensaje !== "") {
      setNotificationText(mensaje);
      setShowNotification(true);
    }
  }, [mensaje]);


  return (
    <section className="signup full-block">
      <div className="container signup-content">
        <h2 className="signup-title">Soy nuevo/a</h2>
        <form id="signupForm" className="signup-form" onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                type="text"
                placeholder="Nombre..."
                name="name"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="username">Nombre de Usuario </label>
              <input
                id="username"
                type="text"
                placeholder="Nombre de usuario..."
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="correo">Correo electrónico </label>
              <input
                id="correo"
                type="correo"
                placeholder="correo..."
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="telefono">Teléfono</label>
              <input
                id="telefono"
                type="number"
                placeholder="Número de teléfono..."
                nombre="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="contraseña">Contraseña</label>
              <input
                id="contraseña"
                type="contraseña"
                placeholder="Contraseña..."
                name="contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="contraseña2">Repita la contraseña</label>
              <input
                id="contraseña2"
                type="contraseña"
                placeholder="Repite la contraseña..."
                name="contraseña2"
                value={formData.contraseña2}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="direccion">Dirección</label>
              <input
                id="direccion"
                type="text"
                placeholder="Dirección..."
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                required
              />
            </div>
            <div className="signup_terms">
              <input
                id="terminos"
                type="checkbox"
                name="terminos"
                checked={formData.terminos}
                onChange={handleChange}
                required
              />
              <label htmlFor="terminos">
                * Términos y condiciones<br /> 
              </label>
            </div>
          </div>
          <div>
            <p>
              ¿Ya tienes cuenta? <Link to={"./../login"}>Iniciar sesión</Link>
            </p>
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

