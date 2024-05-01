import React, {useContext} from "react";
import { AppContext } from "../components/AppContext";
import ProductCard from "./../components/ProductCard";


function Cart(){
    const { carritoItems, seCarritoItems } = useContext(
        AppContext
      );
    let productsToRender = carritoItems.map(product => {
        return (<ProductCard
                  key={product.productoID}
                  productName={product.nombreProducto}
                  sinStock={false}
                  productoID={product.productoID}
                  productType={product.genero}
                  precio={product.precio}
                  precio_anterior={product.precio_anterior}
                  cart={true}
                />)
      })
    return (
        <main className="full-block">
            <section className="products-section products-accessories full-block" id="on-sale">
                <div className="container">
                    <h2 className="pageTitle">Carrito</h2>
                    <div className="grid-container a" id="clothes_grid">
                    {productsToRender}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Cart;