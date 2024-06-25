import { Navigate, Outlet } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useState, useEffect } from "react";

const PrivateRoute = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("eventify_auth_token");
        if (token) {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-10 text-2xl text-[#E0580C] min-h-screen">
        <p>Loading...</p> <PropagateLoader color="#E0580C" />
      </div>
    );

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/signin" />
    );
}

export default PrivateRoute;
