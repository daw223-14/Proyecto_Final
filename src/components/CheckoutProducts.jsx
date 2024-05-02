import React, { useContext } from 'react';
import './../styles/CheckoutProducts.css';
import { AppContext } from './AppContext';

const CheckoutProducts = () => {
  const { carritoItems, setCarritoItems } = useContext(AppContext);

  const calculateTotalPrice = () => {
    if (carritoItems) {
      let total = 0;
      carritoItems.forEach((item) => {
        total += parseFloat(item.precio) * item.cantidad;
      });
      return total.toFixed(2);
    }
    return null;
  };

  const eliminarProducto = (index) => {
    const updatedItems = [...carritoItems];
    updatedItems.splice(index, 1);
    setCarritoItems(updatedItems);
  };

  const vaciarCarrito = () => {
    setCarritoItems([]);
  };

  const cambiarCantidad = (index, newQuantity) => {
    const updatedItems = [...carritoItems];
    updatedItems[index].cantidad = newQuantity;
    setCarritoItems(updatedItems.filter((item) => item.cantidad > 0));
  };

  return (
    <div className="checkout-products-container">
      <h2 className="checkout-products-title">Tu Carrito</h2>
      {carritoItems?.map((item, index) => (
        <div key={index} className="checkout-product">
          <img src={item.rutaimg} alt="" />
          <h3 className="product-nombre">{item.productName}</h3>
          <p className='product-talla'>Talla: {item.talla}</p>
          <p className="product-quantity">Cantidad: {item.cantidad}</p>
          <p className="product-precio">Precio Unidad: {parseFloat(item.precio).toFixed(2)}€</p>
          <hr className="product-divider" />
          <div className="quantity-controls">
            <button onClick={() => cambiarCantidad(index, item.cantidad - 1)}>-</button>
            <input type="number" value={item.cantidad} onChange={(e) => cambiarCantidad(index, parseInt(e.target.value))} />
            <button onClick={() => cambiarCantidad(index, item.cantidad + 1)}>+</button>
          </div>
          <p className="product-total">Total: {(parseFloat(item.precio) * item.cantidad).toFixed(2)} €</p>
          <button onClick={() => eliminarProducto(index)}>Eliminar</button>
        </div>
      ))}
      <div className="checkout-products-total">
        <h2>Total: {carritoItems && calculateTotalPrice()}€</h2>
      </div>
      <button onClick={vaciarCarrito}>Vaciar Carrito</button>
    </div>
  );
};

export default CheckoutProducts;
