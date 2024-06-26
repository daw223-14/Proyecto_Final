import React, { useState, useEffect, useContext } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "./axios";
import "./../styles/Payment.css";
import Notification from "./../components/Notification";
import { AppContext } from "./AppContext";

function Payment({ userData }) {
  const [checkoutCartItems, setCheckoutCartItems] = useState([]);
  const { carritoItems, setCarritoItems } = useContext(AppContext);
  

  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  const closeNotification = () => {
    setShowNotification(false);
    setNotificationText("");
  }; 

  useEffect(() => {
    setCheckoutCartItems(carritoItems);
  }, [carritoItems]);

  const createOrder = async (data, actions) => {
    try {
        const productoIDyCantidades = checkoutCartItems.map((item) => ({
            productoID: item.productoID,
            cantidad: item.cantidad
        }));
      
     const response = await axios.post('/checkout.php', {
            nombre: userData.nombre,
            correo: userData.correo,
            telefono: userData.telefono,
            direccion: userData.direccion,
            productoIDyCantidades: productoIDyCantidades
        }, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        }
        )
        const totalAmount = parseFloat(response.data.totalAmount).toFixed(2);;
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: totalAmount,
                    },
                },
            ],
        });
    } catch (error) {
        console.error("Error calculando la cantidad total:", error);
        return null;
    }
};

const onApprove = async (data, actions) => {
    try {  
    const productoIDyCantidades = checkoutCartItems.map((item) => ({
        productoID: item.productoID,
        cantidad: item.cantidad
    }));
     const response = await axios.post('/order.php', {
            nombre: userData.nombre,
            correo: userData.correo,
            telefono: userData.telefono,
            direccion: userData.direccion,
            productoIDyCantidades: productoIDyCantidades
        }, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        }
        )
        setNotificationText(response.data.mensaje);
        setShowNotification(true);
        setCheckoutCartItems([]);
        setCarritoItems([])
        localStorage.removeItem('carritoItems');
        return actions.order.capture().then(function(details){
          console.log(details)
        });
    } catch (error) {
        console.error("Error calculating total amount:", error);
        return null;
    }
};
  
  return (
    <div className="full-block">
      <div className="paymentButtons">
      <PayPalScriptProvider options={{ clientId: "AUxYUl3I6Uev8zL9tMUd1BkLovukpM1HjpSlxHRAtroUGAM3eDZImFaUU8Wui523HMgvfFywxbSuWjpL" }}>
          <PayPalButtons
            forceReRender={[userData]}
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
          />
        </PayPalScriptProvider>
      </div>
      {showNotification && <Notification show={showNotification} onClose={closeNotification} text={notificationText} />}
    </div>
  );
}

export default Payment;