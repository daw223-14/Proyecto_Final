import React from "react";

export default function Footer() {
    return (
      <footer className="bg-dark pb-0 text-white">
        <div className="container">
          <div className="row justify-content-md-between gutter-2">
  
            <div className="order-1 col-md-8 col-lg-4">
              <div className="row">
                <div className="col">
                  <h4 className="eyebrow mb-1">CYCLE'S</h4>
                  <ul className="menu-list">
                    <li className="menu-list-item"><a href="#" className="menu-list-link">Sobre Nosotros</a></li>
                    <li className="menu-list-item"><a href="#" className="menu-list-link">Terminos y Condiciones</a></li>
                    <li className="menu-list-item"><a href="#" className="menu-list-link">Prensa</a></li>
                    <li className="menu-list-item"><a href="#" className="menu-list-link">Ajustes de Privacidad</a></li>
                  </ul>
                </div>
                <div className="col">
                  <h4 className="eyebrow mb-1">Centro de Ayuda</h4>
                  <ul className="menu-list">
                    <li className="menu-list-item"><a href="#" className="menu-list-link">Shipping</a></li>
                    <li className="menu-list-item"><a href="#" className="menu-list-link">Devoluciones</a></li>
                    <li className="menu-list-item"><a href="#" className="menu-list-link">Pagos</a></li>
                    <li className="menu-list-item"><a href="#" className="menu-list-link">FAQ</a></li>
                  </ul>
                </div>
              </div>
            </div>
  
            <div className="order-2 order-md-3 order-lg-2 col-md-8 col-lg-4">
              <h4 className="eyebrow mb-1">Subscribete a la Newsletter</h4>
              <div className="input-combined mb-2">
                <input type="text" className="form-control" placeholder="Tu correo..." aria-label="Your Email" aria-describedby="button-addon2" />
                <button className="btn btn-white" type="button" id="button-addon2">Subscribete</button>
                <span className="input-combined_indicator"></span>
              </div>
              <ul className="list list--horizontal">
                <li><a href="#!" className="text-hover-facebook"><i className="fs-28 icon-facebook-square-brands"></i></a></li>
                <li><a href="#!" className="text-hover-instagram"><i className="fs-28 icon-instagram-square-brands"></i></a></li>
                <li><a href="#!" className="text-hover-twitter"><i className="fs-28 icon-twitter-square-brands"></i></a></li>
                <li><a href="#!" className="text-hover-pinterest"><i className="fs-28 icon-pinterest-square-brands"></i></a></li>
              </ul>
            </div>
  
            <div className="order-3 order-md-2 order-lg-3 col-md-4 col-lg-3">
              <h4 className="eyebrow mb-1">Region & Currency</h4>
              <div className="select-frame mb-2">
                <select className="custom-select custom-select-lg mb-2" id="countrySelect2">
                  <option value="1">United States</option>
                  <option value="2">España</option>
                </select>
              </div>
              <div className="select-frame">
                <select className="custom-select custom-select-lg" id="curencySelect2">
                  <option value="1">USD</option>
                  <option value="2">EUR</option>
                </select>
              </div>
              <ul className="list list--horizontal mt-2">
                <li><img src="src/assets/visa-1.svg" className="payment" alt="allwell" /></li>
                <li><img src="src/assets/master-card-1.svg" className="payment" alt="allwell" /></li>
                <li><img src="src/assets/amex-1.svg" className="payment" alt="allwell" /></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      );
  }