import { Navigate, Outlet} from "react-router-dom";
import App from "../App";

const ProtectedRoute = ({
    canActivate,
    redirectPath = '/login'
}) => {
    if (!canActivate) {
        return <Navigate to={redirectPath} replace />
    }
    return <Outlet />;
}
export default ProtectedRoute