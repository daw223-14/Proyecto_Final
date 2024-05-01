import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from "./AppContext";

export default function SecondContent() {
  const { isUserLogged, handleLogout } = useContext(AppContext);
  const logOut = () => {
    localStorage.removeItem('token'); // Eliminar el token del localStorage
    handleLogout(); // Actualizar el estado de autenticación en el contexto
  };
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
                  <input type="text" placeholder='Search' />
                </div>
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
                      {!isUserLogged && (
                        <>
                          <li>
                            <NavLink className="page" to="/login">Iniciar Sesión</NavLink>
                          </li>
                          <li>
                            <NavLink className="page" to="/signup">Regístrate</NavLink>
                          </li>
                        </>
                      )}
                      {isUserLogged && (
                        <>
                          <li>
                            <span className="navlinkName">¡Bienvenido!</span>
                          </li>
                          <li>
                            <NavLink to="/" onClick={logOut} className="custom-active-class">Cerrar Sesión</NavLink>
                          </li>
                        </>
                      )}
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
                    <span className="d-inline-block d-lg-none">Cesta</span>
                    </div>
                </NavLink>                      
            </li>
          </ul>
        </div>
    );
}