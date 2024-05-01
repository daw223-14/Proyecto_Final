import React from 'react';
import './../styles/CheckoutProducts.css'

const CheckoutProducts = () => {
  const carritoItems = JSON.parse(localStorage.getItem('carritoItems'));

  const calculateTotalPrice = () => {
    if(carritoItems){
      let total = 0;
      carritoItems.forEach((item) => {
        total += parseFloat(item.precio) * item.cantidad;
      });
      return total.toFixed(2);
      }
      return null
    };
  
  return (
    <div className="checkout-products-container">
      <h2 className="checkout-products-title">Tu Carrito</h2>
      {carritoItems?.map((item, index) => (
        <div key={index} className="checkout-product">
          <h3 className="product-nombre">{item.productName}</h3>
          <p className="product-cantidad">Cantidad: {item.cantidad}</p>
          <p className="product-precio">Precio Unidad: {parseFloat(item.precio).toFixed(2)}€</p>
          <hr className="product-divider" />
          <p className="product-total">Total: {(parseFloat(item.precio) * item.cantidad).toFixed(2)} €</p>
          
        </div>
      ))}
      <div className="checkout-products-total">
        <h2>Total: {carritoItems && calculateTotalPrice()}€</h2>
      </div>
    </div>
  );
};

export default CheckoutProducts;
