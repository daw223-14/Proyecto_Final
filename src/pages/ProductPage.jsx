import React, {useEffect, useState, useContext} from "react";
import axios from "./../components/axios";
import { useParams } from "react-router-dom";
import "./../styles/ProductPage.css"
import ImageSlider from "../components/ImagesSlider";
import { AppContext } from "../components/AppContext";

function ProductPage() {
  const {productId} = useParams();
  const [producto, setProducto] = useState({})
  const [imagen, setImagen] = useState([]);
  const { carritoItems, setCarritoItems } = useContext(AppContext);
  const productoEnCarrito = carritoItems.find((item) => item.productId === productId);
  const cantidadEnCarrito = productoEnCarrito ? productoEnCarrito.cantidad : 0;
  const fetchData = async () => {
    try {
      const response = await axios.get("/api.php", {
        params: {
          productId: productId,
          limit:1
        }
      });
      setProducto(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const productoEnCarrito = carritoItems.find((item) => item.productId === productId);

    if (productoEnCarrito) {
      setCarritoItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.productId === productId
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      const {nombre, genero, precio, precio_anterior} = producto
      const productName = nombre;
      const productGenero = genero;
      setCarritoItems((prevCartItems) => [
        ...prevCartItems,
        {
          productId,
          productName,
          productGenero,
          precio,
          precio_anterior,
          cantidad: 1,
        },
      ]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (producto.productoID) {
      const productImages = Array.from({ length: 2 }, (_, index) => {
          return (index===0?
          `../src/assets/img0${producto.productoID}.jpg` :
          `../src/assets/product${producto.productoID}-2.jpg`)
          });      
      setImagen(productImages);
    }
  }, [producto]);
  
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

  return (
    <main className="full-block">
            <div className="full-block product-section">
            <div className="container full-product-page">
                <div className="about-product-n-info">
                    <div className="about-product">
                        <div className="products-photos">
                          <ImageSlider images={imagen} />
                        </div>
                        <div className="product-desc">
                            <div className="product-desc_content">
                                <div><h2>
                                    {producto.nombre}
                                  </h2></div>
                                <div>
                                    <p className="price-wrapper"><span className="prouct-item-little-desc_product-price">${producto.precio}</span> {producto.precio_anterior ? <del className="producto-item-little-desc_old-producto-precio">${producto.precio_anterior}</del> : null}</p>
                                    <p className="product-desc_content-text">{producto.descripcion}</p>
                                </div>
                                <div className="wishlist-cart">
                                <div className="product-page-btns">
                                  <div className="product-page-add-remove">
                                    <button onClick={handleAddToCart} genero="submit"  id="add-to-wishlist-btn">Add to cart</button>
                                    <button onClick={handleRemoveFromCart} genero="submit"  id="add-to-wishlist-btn">Remove from cart</button>
                                  </div>
                                  <div className="quantity-controls">
                                    <div>
                                      Control de cantidad
                                      <button onClick={handleDecrementQuantity} className="quantity-btn">
                                        -
                                      </button>
                                      <button onClick={handleAddToCart} className="quantity-btn">
                                        +
                                      </button>
                                    </div>
                                  </div>        
                                </div>
                                        <div>
                                          <p>The item has been added to the cart: {cantidadEnCarrito} times</p>
                                        </div>
                                    <div className="wishlist-and-share">
                                        <p>Category:<span id="product-category-name">{producto.genero}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      <div>{productId}</div>
    </main>
  );
}

export default ProductPage;




