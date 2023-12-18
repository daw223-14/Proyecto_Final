import {NavLink} from 'react-router-dom';
export default function FirstContent() {
  return (
         <div className="collapse navbar-collapse order-3 order-lg-1" id="navbarMenu">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/hombre">
                    HOMBRE
                  </NavLink> 
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/mujer">
                    MUJER
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/niños">
                    NIÑOS
                  </NavLink>
                </li>
              </ul>
            </div>
    );
}