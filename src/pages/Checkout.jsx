import React, {useState, useEffect, useContext} from "react";
import CheckoutUserData from "../components/CheckoutUserData";
import Payment from "../components/Payment";
import CheckoutProducts from "../components/CheckoutProducts";
import "./../styles/Checkout.css"
import axios from "../components/axios";
import { AppContext } from "./../components/AppContext";

function Checkout(){
    const [userData, setUserData] = useState({
        nombre: '',
        correo: '',
        telefono: '',
        direccion: ''
    });
    const { carritoItems, setCarritoItems } = useContext(AppContext);
    localStorage.setItem("carritoItems", JSON.stringify(carritoItems));
      
    const token = localStorage.getItem('token');

      useEffect(() => {
        if (token) {
          axios
            .post("/getUserData.php", { token }, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              console.log(response)
              if (response.data.mensaje === "Usuario encontrado") {
                setUserData(response.data.usuario);
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }, []);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };
      
    return (
        <main className="full-block">
            <div className="checkoutContainer">
                <div className="checkoutFlex">
                    <CheckoutUserData handleInputChange={handleInputChange} nombre={userData.nombre}
                        correo={userData.correo} telefono={userData.telefono} direccion={userData.direccion} 
                    />
                    <CheckoutProducts />
                </div>
                <Payment userData={userData} />
            </div>
        </main>
    )
}

export default Checkout;