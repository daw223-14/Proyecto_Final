import React, {useState} from "react";
import "./../styles/ContactUs.css"
import axios from "./../components/axios";
import Notification from "./../components/Notification";

function ContactUs(){
    let [formData, setFormData] = useState({
        nombre: "",
        correo: "",
        mensaje: ""
    })

    const [showNotification, setShowNotification] = useState(false);
    const [notificationText, setNotificationText] = useState("");
  
    const closeNotification = () => {
      setShowNotification(false);
      setNotificationText("");
    };  

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      };
      function handleSubmit(event) {
        event.preventDefault();
      
        const data = new FormData();
        data.append('nombre', formData.nombre);
        data.append('correo', formData.correo);
        data.append('mensaje', formData.mensaje);
      
        axios
          .post("/contactus.php", data)
          .then((response) => {
                setNotificationText(response.data.mensaje);
                setShowNotification(true);
                setFormData({
                    nombre: "",
                    emaicorreol: "",
                    mensaje: ""
                })
            })
          .catch((error) => {
            console.error(error);
          });
      }
    return (
        <main className="full-block">
            <section className="contact-section">
                <div className="container">
                    <h1>Contact Us</h1>
                    <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Nombre:</label>
                            <input type="text" value={formData.name} onChange={handleChange} id="name" name="name" required />
                        </div>
            
                        <div className="form-group">
                            <label htmlFor="email">Correo:</label>
                            <input type="email" value={formData.email} onChange={handleChange} id="email" name="email" required />
                        </div>
            
                        <div className="form-group">
                            <label htmlFor="mensaje">Mensaje:</label>
                            <textarea id="mensaje" value={formData.message} onChange={handleChange} name="mensaje" required></textarea>
                        </div>        
                        <button type="submit">Enviar</button>
                    </form>
                </div>
            </section>
            {showNotification && <Notification show={showNotification} onClose={closeNotification} text={notificationText} />}
        </main>
    )
}

export default ContactUs;