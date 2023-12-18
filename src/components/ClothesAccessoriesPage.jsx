import React, { useState, useEffect } from "react";
import GetproductosForm from "./GetProductsForm";
import axios from "./axios";
import ProductCard from "./ProductCard";

function ClothesAccessoriesPage({genero}) {
  const [formValues, setFormValues] = useState({
    search: "",
    marca: "",
    precio: 1000,
  });
  const [productos, setProductos] = useState([]);

  const handleChange = (event) => {
    const { nombre, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [nombre]: value,
    }));
  };

  const resetOnClick = () =>{
    setFormValues({
      search: "",
      marca: "",
      precio: 1000,
    })
    fetchData();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get("/api.php", {
        params: {
          genero: genero,
          marca: formValues.marca,
          precio: formValues.precio,
          nombre: formValues.search,
        },
      });
      setProductos(response.data);
    } catch (error) {
      console.error(error);
      setProductos([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api.php", {
        params: {
          genero: genero
        },
      });
      setProductos(response.data);
    } catch (error) {
      console.error(error);
      setProductos([]);
    }
  };
  let productosToRender = productos.map(product => {
    return (<ProductCard
              key={product.productoID}
              productName={product.nombre}
              sinStock={false}
              productId={product.productoID}
              productGenero={product.marca}
              precio={product.precio}
              precio_anterior={product.precio_anterior}
            />)
  })
  let titulo;
  if (genero === "mujer") {
    titulo = "Mujer";
  } else if (genero === "hombre") {
    titulo = "Hombre";
  } else {
    titulo = "Niños";
  }
  return (
    <div>
      <GetproductosForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        search={formValues.search}
        marca={formValues.marca}
        precio={formValues.precio}
        resetOnClick={resetOnClick}
      />
        <section className="products-section products-accessories full-block" id="on-sale">
          <div className="container">
            <h2  className="pageTitle">
              {titulo}
              </h2>
            <div className="grid-container a" id="clothes_grid">
              {productosToRender}
            </div>
          </div>
      </section>
    </div>
  );
}

export default ClothesAccessoriesPage;