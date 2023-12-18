import React, { useState, useEffect } from "react";
import "../styles/SubscribeSection.css";
import axios from "./axios";
import Notification from "./Notification";

function SubscribeSection() {
  const [correo, setEmail] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");


  function handleChange(event) {
    setEmail(event.target.value);
  }
  const closeNotification = () => {
    setShowNotification(false);
    setNotificationText("");
  };  
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("correo", correo);
    axios
      .post("/insert_email.php", formData)
      .then((response) => {
        console.log(typeof response.data.mensaje);
        console.log(notificationText);
        console.log(showNotification);
        setNotificationText(response.data.mensaje)
        setShowNotification(true)
      })
      .catch((error) => {
        setNotificationText("Something went wrong!")
        console.error(error);
      });
      setEmail("");
  }

  return (
    <section className="subscribe-section full-block">
      <div className="container">
        <div className="subscribe-section-flex-container">
          <div className="subscribe-section-flex-container_left-side">
            <h4>Autumn / Winter Sale</h4>
            <p>Subscribe and Take 40% Off On Women’s</p>
          </div>
          <div className="subscribe-section-flex-container_right-side">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                required
                onChange={handleChange}
                value={correo}
                name="correo"
                id="email-input"
                placeholder="Introduce tu correo..."
              />
              <button type="submit" id="subscribe-btn">
                REGISTRATE
              </button>
            </form>
          </div>
        </div>
      </div>
      {showNotification && <Notification show={showNotification} onClose={closeNotification} text={notificationText} />}
    </section>
  );
}

export default SubscribeSection;
