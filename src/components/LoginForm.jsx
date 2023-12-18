import React, {useState, useContext, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LoginForm.css"
import axios from "./axios";
import { AppContext } from "./AppContext";
import Notification from "./../components/Notification";

function LoginForm(){
    const [formData, setFormData] = useState({
        login_usuario_correo: "",
        login_contraseña: ""
      });
    const { isUserLogged, setIsUserLogged, handleLoginToken } = useContext(
      AppContext
    );
    
    const [showNotification, setShowNotification] = useState(false);
    const [notificationText, setNotificationText] = useState("");
  
    const closeNotification = () => {
      setShowNotification(false);
      setNotificationText("");
      if(isUserLogged){
        navigate("/");
      }
    }; 

    const navigate  = useNavigate();
    
    useEffect(() => {
      if (isUserLogged && !showNotification) {
        navigate("/");
      }
    }, [isUserLogged, navigate, showNotification]);

    const handleChange = (e) => {
        const { name, value} = e.target;
    
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
    
    const handleSubmit = (e) => {
        e.preventDefault();
         
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          data.append(key, value);
        });
      
        axios
          .post("/login2.php", data)
          .then((response) => {
            const loggeado = JSON.parse(response.data.loggeado);
            setIsUserLogged(loggeado);
            localStorage.setItem("isUserLogged", loggeado);
            setNotificationText(response.data.message);
            setShowNotification(true);
            if (loggeado) {
              handleLoginToken(response.data.token);
              localStorage.setItem("usuarios", JSON.stringify(response.data.user));
            }
          })
          .catch((error) => {
            console.error("Error al enviar el formulario:", error);
          });
      };
    

    return (
        <section className="login full-block">
            <div className="container login-content">
                <h2 className="login-title">Iniciar Sesión</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="login_usuario_correo">* Usuario o Correo</label>
                        <input id="login_usuario_correo" onChange={handleChange} value={formData.login_usuario_correo} type="text" placeholder="Usuario o Correo..." name="login_usuario_correo" required />
                    </div>
                    <div>
                        <label htmlFor="login_contraseña">* Contraseña</label>
                        <input id="login_contraseña" onChange={handleChange} value={formData.login_contraseña} type="password" placeholder="Contraseña..." name="login_contraseña" required/>
                    </div>
                    <div>
                        <p>¿Aún no eres cliente? <Link to={"./../signup"}>Regístrate aqui</Link></p>
                    </div>
                    <button className="btn btn--form" type="submit" value="Log in">Iniciar Sesión</button>
                </form>
            </div>
            {showNotification && <Notification show={showNotification} onClose={closeNotification} text={notificationText} />}
        </section>
    )
}

export default LoginForm;