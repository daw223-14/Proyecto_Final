import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import "./../styles/ProductsSection.css";
import axios from "./axios";

function ProductsSection({ sectionTitle, sectionPhrase, filter, id }) {
  const [productos, setProductos] = useState([]);
  let saleSection = false;
  if(filter == "sale_percentage"){
    saleSection = true;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api.php", {
          params: {
            sort: filter,
            limit: 8
          },
        });
        setProductos(response.data);
      } catch (error) {
        console.error(error);
        setProductos([]);
      }
    };

    fetchData();
  }, [filter]);

  const mostrarProductos = productos.map((productos) => (
    <ProductCard
      key={productos.productoID}
      productName={productos.nombre}
      sinStock={false}
      productId={productos.productoID}
      productGenero={productos.marca}
      precio={productos.precio}
      precio_anterior={productos.precio_anterior}
      sale={true}
    />
  ));

  return (
    <section className="products-section products-featured full-block" id={id}>
      <div className="container">
        <div className="products-section_title">
          <h3>{sectionTitle}</h3>
          <p>{sectionPhrase}</p>
        </div>
        <div className="grid-container">{mostrarProductos}</div>
      </div>
    </section>
  );
}

export default ProductsSection;
