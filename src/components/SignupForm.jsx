import React, { useState, useEffect, useContext } from "react";
import "./../styles/SignupForm.css";
import axios from "./axios";
import { Link, useNavigate  } from "react-router-dom";
import { AppContext } from "./AppContext";
import Notification from "./../components/Notification";

function SignupForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    username: "",
    correo: "",
    telefono: "",
    contraseña: "",
    contraseña2: "",
    direccion: "",
    terms: false,
  });
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState("");
  const [signedUp, setSignedUp] = useState(false);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  const closeNotification = () => {
    setShowNotification(false);
    setNotificationText("");
    setMessage("");
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
    let errors = [];
    if (!formData.terms) {
      errors.push("* Tienes que aceptar los términos y condiciones");
    }
  
    if (!/^[a-zA-Z\s]+$/.test(formData.nombre)) {
      errors.push("Nombre Incorrecto. Por favor, introduce un nombre sin carácteres especiales.");
    }
  
    if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(formData.username)) {
      errors.push("Invalid username. It must start with a letter and can contain only letters and numbers.");
    }
  
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.correo) || formData.correo.length > 70) {
      errors.push("Invalid correo. correo should be a valid direccion and cannot exceed 70 characters.");
    }
  
    if (!/^\d{1,70}$/.test(formData.telefono) || formData.telefono.length > 70) {
      errors.push("Invalid telefono number. telefono number should only contain digits and cannot exceed 70 characters.");
    }
  
    if (formData.contraseña !== formData.contraseña2) {
      errors.push("Passwords do not match.");
    }
  
    if (formData.direccion.length > 128) {
      errors.push("direccion exceeds the maximum length of 128 characters.");
    }
  
    return errors;
}

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const validationErrors = validation();
  
    setErrors(validationErrors); 
  
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
        <h2 className="signup-title">Soy nuevo/a</h2>
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
              <label htmlFor="email">Correo electrónico </label>
              <input
                id="email"
                type="email"
                placeholder="correo..."
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="phone">Teléfono</label>
              <input
                id="phone"
                type="number"
                placeholder="Número de teléfono..."
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                placeholder="Contraseña..."
                name="contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password2">Repita la contraseña</label>
              <input
                id="password2"
                type="password"
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
              <label htmlFor="address">Dirección</label>
              <input
                id="address"
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
                id="terms"
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                required
              />
              <label htmlFor="terms">
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

export default SignupForm;

