import React, { createContext, useState, useMemo } from "react";

//cambiar los nombres para hacer uno solo para usuario regular y otro para superusuario
const AppContext = createContext();
//const AdminContext = createContext();

const AppProvider = ({ children }) => {
  const initialToken = localStorage.getItem("token") || "";
  const initialCarritoItems = JSON.parse(localStorage.getItem("carritoItems")) || [];

  const [isUserLogged, setIsUserLogged] = useState(false);
  const [token, setToken] = useState(initialToken);
  const [carritoItems, setCarritoItems] = useState(initialCarritoItems);

  const handleLogout = () => {
    setIsUserLogged(false);
    setToken("");
    localStorage.removeItem("token");
  };

  const handleLoginToken = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
    setIsUserLogged(true);
  };

  const appContextValue = useMemo(() => ({
    isUserLogged,
    setIsUserLogged,
    token,
    handleLogout,
    handleLoginToken,
    carritoItems,
    setCarritoItems
  }), [isUserLogged, token, carritoItems]);

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};
//seccion para el superusuario
/* const AdminProvider = ({ children }) => {
  const initialAdminToken = localStorage.getItem("adminToken") || "";
  const [isAdminLogged, setIsAdminLogged] = useState(false);
  const [adminToken, setAdminToken] = useState(initialAdminToken);

  const handleAdminLogout = () => {
    setIsAdminLogged(false);
    setAdminToken("");
    localStorage.removeItem("adminToken");
  };

  const handleAdminLoginToken = (serverToken) => {
    setAdminToken(serverToken);
    localStorage.setItem("adminToken", serverToken);
    setIsAdminLogged(true);
  };

  const adminContextValue = useMemo(() => ({
    isAdminLogged,
    setIsAdminLogged,
    adminToken,
    handleAdminLogout,
    handleAdminLoginToken
  }), [isAdminLogged, adminToken]);

  return (
    <AdminContext.Provider value={adminContextValue}>
      {children}
    </AdminContext.Provider>
  );
}; */

export { AppContext, AppProvider};