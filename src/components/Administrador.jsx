import React, { useState, useEffect } from "react";
import axios from "./axios";

function Administrador() {

    const [producto, setProducto] = useState({
        productoID: "",
        nombre: "",
        genero: "",
        descripcion: "",
        marca: "",
        precio: "",
        cantidadVendido: "",
        fechaAñadido: "",
        rutaimg: "",
        precio_anterior: ""
    });
    const [mensaje, setMensaje] = useState(""); 
    const [productos, setProductos] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (producto.productoID) {
            editarProducto(producto.productoID);
        } else {
            agregarProducto(e);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await axios.get("/index.php");
            setProductos(response.data.productos);
        } catch (error) {
            console.error(error);
            setProductos([]);
        }
    };

    async function agregarProducto(e) {
        e.preventDefault();

        const data = new FormData();
        Object.entries(producto).forEach(([key, value]) => data.append(key, value));
        try {
            await axios.post("/index.php", data)
            setMensaje('Producto agregado correctamente');
            fetchData();
            resetProducto();
        } catch (error) {
            console.error(error);
            setMensaje('Hubo un error al procesar el producto');
        }
    }

    async function editarProducto(productoID){
        try {
            await axios.put(`./index.php?productoID= ${productoID}`, producto);
            setMensaje("Producto actulizado correctamente");
            fetchData();
            resetProducto();
        } catch (error) {
            console.error(error);
            setMensaje('Hubo un error al editar el producto');
        }
    }

    const resetProducto = () => {
        setProducto({
            nombre: "",
            genero: "",
            descripcion: "",
            marca: "",
            precio: "",
            cantidadVendido: "",
            fechaAñadido: "",
            rutaimg: "",
            precio_anterior: ""
        });
    };

    const handleEditar = (product) => {
        setProducto({
            ...producto,
            nombre: product.nombre,
            genero: product.genero,
            descripcion: product.descripcion,
            marca: product.marca,
            precio: product.precio,
            cantidadVendido: product.cantidadVendido,
            fechaAñadido: product.fechaAñadido,
            rutaimg: product.rutaimg,
            precio_anterior: product.precio_anterior,
            productoID: product.productoID
        });
    }

    async function eliminarProducto(productoID) {
        try {
            await axios.delete("./index.php", { data: { productoID } });
            setMensaje('Producto eliminado correctamente');
            fetchData(); // Actualizar la lista de productos después de eliminar uno
        } catch (error) {
            console.error(error);
            setMensaje('Hubo un error al eliminar el producto');
        }
    }

    return (
        <section className="products-section products-accessories full-block" id="on-sale">
            <div className="container">
                <h2>Administrar Productos</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nombre">Nombre: </label>
                    <input 
                        id="nombre" 
                        type="text" 
                        name="nombre" 
                        value={producto.nombre} 
                        onChange={handleInputChange} 
                        required 
                    />   
                    <div>
                        <label htmlFor="genero">Género</label>
                        <select
                            id="genero"
                            type="text"
                            name="genero"
                            value={producto.genero}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Selecciona el género</option>
                            <option value="mujer">Mujer</option>
                            <option value="hombre">Hombre</option>
                            <option value="niños">Niños</option>
                        </select>
                    </div>
                    <label htmlFor="descripcion">Descripcion </label>
                    <input
                        id="descripcion"
                        type="text"
                        name="descripcion"
                        value={producto.descripcion}
                        onChange={handleInputChange}
                        required
                    />
                    <label htmlFor="marca">Marca: </label>
                    <input 
                        id="marca"
                        type="text"
                        name="marca" 
                        value={producto.marca} 
                        onChange={handleInputChange} 
                    />
                    <label htmlFor="precio">Precio: </label>
                    <input
                        id="precio" 
                        type="number"
                        name="precio" 
                        value={producto.precio} 
                        onChange={handleInputChange} 
                    />
                    <label htmlFor="cantidadVendido">Cantidad Vendido: </label>
                    <input
                        id="cantidadVendido" 
                        type="number"
                        name="cantidadVendido"
                        value={producto.cantidadVendido} 
                        onChange={handleInputChange}
                    />
                    <label htmlFor="fechaAñadido">Fecha de añadido: </label>
                    <input
                        id="fechaAñadido"
                        type="text"
                        name="fechaAñadido"
                        value={producto.fechaAñadido}
                        onChange={handleInputChange}
                        required
                    />
                    <label htmlFor="rutaimg">rutaimg</label>
                    <input
                        id="rutaimg"
                        type="text"
                        name="rutaimg"
                        value={producto.rutaimg}
                        onChange={handleInputChange}
                        required
                    />
                    <label htmlFor="precio_anterior">Precio Anterior</label>
                    <input
                        id="precio_anterior"
                        type="text"
                        name="precio_anterior"
                        value={producto.precio_anterior}
                        onChange={handleInputChange}
                    />
                    <br />
                    <button type="submit">{producto.productoID ? 'Editar Producto' : 'Agregar Producto'}</button>
                </form>
                {mensaje && <p>{mensaje}</p>}
                <h3>Listado de Productos</h3>
                <table className="productos-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Genero</th>
                            <th>Marca</th>
                            <th>Precio</th>
                            <th>Cantidad Vendido</th>
                            <th>Ruta imagen</th>
                            <th>Fecha Añadido</th>
                            <th>Precio anterior</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(product => (
                            <tr key={product.productoID}>
                                <td>{product.productoID}</td>
                                <td>{product.nombre}</td>
                                <td>{product.descripcion}</td>
                                <td>{product.genero}</td>
                                <td>{product.marca}</td>
                                <td>{product.precio}€</td>
                                <td>{product.cantidadVendido} unidades</td>
                                <td>{product.rutaimg}</td>
                                <td>{product.fechaAñadido}</td>
                                <td>{product.precio_anterior}</td>
                                <td>
                                    <button onClick={() => handleEditar(product)}>Editar</button>
                                    <button onClick={() => eliminarProducto(product.productoID)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default Administrador;