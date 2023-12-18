import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from "./AppContext";

export default function SecondContent() {
    const { isUserLogged, setIsUserLogged, handleLogout } = useContext(AppContext);
  const isUserLoggedLS = localStorage.getItem("isUserLogged") === "true";
  function logOut(){
      localStorage.setItem("isUserLogged", false)
      localStorage.setItem("user", null);
      handleLogout();
  }
        
  return (
        <div className="collapse navbar-collapse order-5 order-lg-3" id="navbarMenu2">
          <ul className="navbar-nav ml-auto position-relative">

            <li className="nav-item dropdown dropdown-md dropdown-hover">
              <a className="nav-icon dropdown-toggle" id="navbarDropdown-4" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="icon-search d-none d-lg-inline-block"></i>
                <span className="d-inline-block d-lg-none">Buscar</span>
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown-4">
                <div className="form-group">
                <input
                type="text"
                placeholder='Search'
                />
                </div>
              </div>
            </li>

            <li className="d-none d-lg-inline nav-item dropdown dropdown-md dropdown-hover">
              <a className="nav-icon" id="navbarDropdown-5" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="icon-globe"></i></a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown-5">
                <fieldset>
                  <div className="row">
                    <div className="col-12">
                      <div className="select-frame">
                        <select className="custom-select custom-select-lg" id="countrySelect1">
                          <option value="1">United States</option>
                          <option value="2">Español</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="select-frame">
                        <select className="custom-select custom-select-lg" id="curencySelect1">
                          <option value="1">USD</option>
                          <option value="2">EUR</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </li>

            <li className="nav-item dropdown dropdown-md dropdown-hover">
              <a className="nav-icon dropdown-toggle" id="navbarDropdown-6" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="icon-user d-none d-lg-inline-block"></i>
                <span className="d-inline-block d-lg-none">Account</span>
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown-6">
                <div className="row gutter-2">
                  <div className="col-12">
                    <nav>
                      <ul>
                  {!isUserLoggedLS && <li>
                  <NavLink className="page"  to="/login">Iniciar Sesión</NavLink>                 
                  </li>}
                  {!isUserLoggedLS && <li>
                  <NavLink className="page"  to="/signup">Registrate</NavLink>                   
                  </li>}
                  {(isUserLogged || isUserLoggedLS) && <li>
                  <NavLink to="/" onClick={logOut}  className="custom-active-class">Salir</NavLink>                     
                  </li>}
                  {(isUserLogged || isUserLoggedLS) && <li>
                  <span className="navlinkName">Bienvenido {JSON.parse(localStorage.getItem("user"))}</span>                     
                  </li>}
                    <div className="col-12 text-center">
                    <a href="#" className="underline fs-14">¿Olvidaste tu contraseña?</a>
                  </div>
                  </ul>
                  </nav>
                  </div>
                </div>
              </div>
            </li>

            <li className="nav-item dropdown dropdown-md dropdown-hover">
                <NavLink to="/checkout" id="navbarDropdown-8" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <div className="nav-icon" id="navbarDropdown-6" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="icon-shopping-bag d-none d-lg-inline-block"></i>
                    <span className="d-inline-block d-lg-none">Bag</span>
                    </div>
                </NavLink>                      
            </li>
          </ul>
        </div>
    );
}