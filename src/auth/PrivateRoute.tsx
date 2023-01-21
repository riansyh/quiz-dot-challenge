import { Navigate } from "react-router-dom";

const PrivateRoute = (props: any) => {
    const token = localStorage.getItem("auth");

    if (!token) {
        return <Navigate to="/login" />;
    }

    return props.children;
};

export default PrivateRoute;
