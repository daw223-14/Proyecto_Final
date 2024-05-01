import React, { useState, useContext, useEffect } from "react";
import "../styles/ProductCard.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";

function ProductCard({ productoID, productName, sinStock, productType, precio, precio_anterior, rutaimg, tallas }) {
  const { carritoItems, setCarritoItems } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("carritoItems", JSON.stringify(carritoItems));
  }, [carritoItems]);

  // Agregar a la cesta
  const handleProductClicked = (e) => {
    e.stopPropagation();
    navigate("/producto/" + productoID);
  }

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
          {/* <img src={`src/assets/img0${productoID}.jpg`} alt="" /> */}
          <img src={rutaimg} alt="" />
        </p>
      </div>
      <div className="product-item-little-desc">
        <div>
          <p className="product-item-little-desc_categories-name">
            {productType}
          </p>
        </div>
        <div>
          <p className="product-item-little-desc_product-name">
            {productName}
          </p>
        </div>
        {precio_anterior > 0 && (
          <del className="product-item-little-desc_old-product-precio">
            {precio_anterior}€
          </del>
        )}
        <span className="product-item-little-desc_product-precio"> {precio}€</span>
      </div>
    </div>
  );
}

export default ProductCard;