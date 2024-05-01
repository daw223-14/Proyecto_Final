import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";
import axios from "./axios";
import { AppContext } from "./AppContext";
import Notification from "./../components/Notification";

function LoginAdmin() {
    const [formData, setFormData] = useState({
        usuario: "",
        contraseña: ""
    });
    const { setIsUserLogged, handleLoginToken } = useContext(AppContext);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationText, setNotificationText] = useState("");
    const navigate = useNavigate();

    const closeNotification = () => {
        setShowNotification(false);
        setNotificationText("");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => data.append(key, value));

        axios
            .post("./loginAdmin.php", data)
            .then((response) => {
                const loggedIn = JSON.parse(response.data.loggedin);
                setIsUserLogged(loggedIn);
                localStorage.setItem("isAdminLogged", loggedIn);
                setNotificationText(response.data.mensaje);
                setShowNotification(true);

                if (loggedIn) {
                    handleLoginToken(response.data.token);
                    navigate("/admin");
                }
            })
            .catch((error) => {
                console.error("Error al enviar el formulario:", error);
                setNotificationText("Error al iniciar sesión. Por favor, intenta de nuevo.");
                setShowNotification(true);
            });
    };

    return (
        <section className="login full-block">
            <div className="container login-content">
                <h2 className="login-title">Iniciar Sesión</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div>
                        <label>* Usuario o Correo</label>
                        <input id="usuario" onChange={handleChange} value={formData.usuario} type="text" placeholder="Usuario Administrador..." name="usuario" required />
                    </div>
                    <div>
                        <label>* Contraseña</label>
                        <input id="contraseña" onChange={handleChange} value={formData.contraseña} type="password" placeholder="Contraseña..." name="contraseña" required />
                    </div>
                    <button className="btn btn--form" type="submit" value="Log in">Iniciar Sesión</button>
                </form>
            </div>
            {showNotification && <Notification show={showNotification} onClose={closeNotification} text={notificationText} />}
        </section>
    )
}

export default LoginAdmin;