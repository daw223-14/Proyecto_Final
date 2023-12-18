import React, { useState, useContext, useEffect } from "react";
import "../styles/ProductCard.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";

function ProductCard({
  productId,
  productName,
  sinStock,
  productGenero,
  marca,
  precio,
  sale,
  precio_anterior,
  cart
}) {
  const { carritoItems, setCarritoItems } = useContext(AppContext);
  const productInCart = carritoItems.find((item) => item.productId === productId);
  const quantityInCart = productInCart ? productInCart.cantidad : 0;
  const navigate  = useNavigate();

  useEffect(() => {
    localStorage.setItem("carritoItems", JSON.stringify(carritoItems));
  }, [carritoItems]);
  const handleProductClicked = (e) => {
    e.stopPropagation();
    const detallesProducto = {
        productId,
        productName,
        precio,
        marca,
        precio_anterior,
        sinStock
      };
    navigate("/producto/" + productId);
  }
  const handleAddToCart = (e) => {
    e.stopPropagation();
    const productInCart = carritoItems.find((item) => item.productId === productId);

    if (productInCart) {
      setCarritoItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.productId === productId
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCarritoItems((prevCartItems) => [
        ...prevCartItems,
        {
          productId,
          productName,
          sinStock,
          productGenero,
          marca,
          precio,
          precio_anterior,
          cantidad: 1,
        },
      ]);
    }
  };

  const handleDecrementQuantity = (e) => {
    e.stopPropagation();
    setCarritoItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.productId === productId && item.cantidad > 0
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      ).filter((item) => item.cantidad > 0)
    );
  };

  const handleRemoveFromCart = (e) => {
    e.stopPropagation();
    setCarritoItems((prevCartItems) =>
      prevCartItems.filter((item) => item.productId !== productId)
    );
  };

  useEffect(() => {
    localStorage.setItem("carritoItems", JSON.stringify(carritoItems));
  }, [carritoItems]);

  return (
        <div className="product-item" onClick={handleProductClicked}>
          <div className="product-item_img">
            {sinStock && <div className="out-of-stock">Sin Stock</div>}
            {precio_anterior > 0 && <div className="sale">REBAJADO!</div>}
            <a href="#" className="action"><i className="icon-heart"></i></a>
            <p>
              <img src={`src/assets/img0${productId}.jpg`} alt="" />
            </p>
          </div>
          <div className="product-item-little-desc">
            <div>
              <p className="product-item-little-desc_categories-name">
                {productGenero}
              </p>
            </div>
            <div>
              <p className="product-item-little-desc_product-name">
                {productName}
              </p>
            </div>
            {precio_anterior > 0 && (
              <del className="product-item-little-desc_old-product-precio">
                ${precio_anterior}
              </del>
            )}
            <span className="product-item-little-desc_product-precio">${precio}</span>
          </div>
        </div>
  );
}

export default ProductCard;