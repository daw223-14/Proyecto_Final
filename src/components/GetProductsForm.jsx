import React, { useState } from "react";
import "./../styles/GetProductsForm.css";

function GetProductsForm({handleChange, handleSubmit, search, marca, precio, resetOnClick}) {

  return (
    <section className="clothes-accessories full-block">
      <div className="container clothes-accessories-content">
        <form className="clothes-accessories-form" onSubmit={handleSubmit}>
          <div className="clothes-accessories-group">
            <label htmlFor="search">Search Product:</label>
            <input
              id="search"
              type="text"
              placeholder="Search"
              name="search"
              value={search}
              onChange={handleChange}
            />
          </div>
          <div className="clothes-accessories-group">
            <label htmlFor="marca">marca:</label>
            <label>
              <input
                type="radio"
                name="marca"
                value="nike"
                checked={marca === "nike"}
                onChange={handleChange}
              />{" "}
              Nike
            </label>
            <label>
              <input
                type="radio"
                name="marca"
                value="adidas"
                checked={marca === "adidas"}
                onChange={handleChange}
              />{" "}
              Adidas
            </label>
            <label>
              <input
                type="radio"
                name="marca"
                value="puma"
                checked={marca === "puma"}
                onChange={handleChange}
              />{" "}
              Puma
            </label>
          </div>
          <div className="clothes-accessories-group">
            <label htmlFor="precio">Sort by precio</label>
            <input
              type="range"
              id="precio"
              name="precio"
              min="10"
              max="1000"
              step="10"
              value={precio}
              onChange={handleChange}
            />
            <span id="priceValue">&lt;{precio}</span>
          </div>
          <input
            type="reset"
            className="getProductsBtns"
            onClick={resetOnClick}
          />
          <button className="btn btn--form getProductsBtns"   type="submit" value="Search">
            Search
          </button>
        </form>
      </div>
    </section>
  );
}

export default GetProductsForm;
