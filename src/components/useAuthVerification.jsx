import { useEffect, useContext } from 'react';
import { AppContext } from './AppContext';

const useAuthVerification = () => {
  const { setIsUserLogged } = useContext(AppContext);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      const isUserLogged = !!token; // true si existe un token

      setIsUserLogged(isUserLogged);
    };

    checkAuthStatus(); // Verificar el estado de autenticación al cargar la aplicación
  }, [setIsUserLogged]);
};

export default useAuthVerification;