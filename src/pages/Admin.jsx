import React, {useContext} from "react";
import { Navigate } from "react-router-dom";
import Administrador from "../components/Administrador";
import {AppContext} from "./../components/AppContext";

function Signup(){
    const { isUserLogged } = useContext(AppContext);
    return isUserLogged ? (
        <main className="full-block">
            <Administrador />
        </main>
    ) : (
        <Navigate to="/loginAdmin" />
    )
}

export default Signup;