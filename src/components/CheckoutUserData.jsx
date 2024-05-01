import "./../styles/CheckoutUserData.css";

function CheckoutUserData (props){
  return (
    <form className='checkoutForm'>
      <label>
        Nombre:
        <input
          type="text"
          name="nombre"
          value={props.nombre}
          onChange={props.handleInputChange}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="correo"
          value={props.correo}
          onChange={props.handleInputChange}
        />
      </label>
      <br />
      <label>
        Telefono:
        <input
          type="tel"
          name="telefono"
          value={props.telefono}
          onChange={props.handleInputChange}
        />
      </label>
      <br />
      <label>
        Direccion:
        <textarea
          name="direccion"
          value={props.direccion}
          onChange={props.handleInputChange}
        />
      </label>
      <br />
    </form>
  );
};

export default CheckoutUserData;
