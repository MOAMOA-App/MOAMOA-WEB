import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import Navbar from "../layout/Navbar";

function RequireAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(
            "RequireAuth 컴포넌트는 AuthProvider 내에서 사용되어야 합니다."
        );
    }
    const { auth } = context;
    const location = useLocation();

    return (
        <>
            {!auth ? (
                <>
                    <Navbar />
                    <Outlet />
                </>
            ) : (
                <Navigate to="login" state={{ from: location }} replace />
            )}
        </>
    );
}

export default RequireAuth;
