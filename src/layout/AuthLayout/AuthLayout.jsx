import { Navigate, Outlet } from "react-router";

function AuthLayout() {
const token = localStorage.getItem("accessToken");
if (token) return <Navigate to="/" replace/>
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-100 w-full bg-white p-8 border border-gray-200 rounded-xl shadow-lg">
            <Outlet/>
        </div>
        </div>
    )
}
export default AuthLayout;