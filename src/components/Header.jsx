import { useGetCurrentUserQuery } from "@/services/auth";
import { NavLink, useNavigate } from "react-router";

function Header() {
    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");
    const {data, isLoading} = useGetCurrentUserQuery(undefined, {skip: !token});
    // console.log(data);
    const handleLogout = ()=> {
        localStorage.removeItem("accessToken");
        navigate("/")
    }
    if (token && isLoading) return (
        <div className="h-16 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-pink-500 border-t-transparent rounded-full animate-spin">
            </div>
        </div>
    );

    
    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
            
            <NavLink to="/" className="text-xl font-bold bg-linear-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
                My App
            </NavLink>

            <div className="flex items-center">
                {data ? (
                    <div className="relative group">
                        <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                            <div className="w-7 h-7 bg-pink-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                {data.firstName?.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm font-medium text-gray-700">
                                Hi, <span className="text-pink-600">{data.firstName}</span>
                            </span>
                        </div>
                        <div className="absolute right-0 top-full pt-2 w-32 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                            <div className="bg-white border rounded-xl shadow-lg overflow-hidden">
                                <button onClick={handleLogout} className="w-full px-4 py-2.5 text-left text-sm font-semibold text-gray-700 rounded-xl hover:bg-pink-50 hover:text-pink-600 cursor-pointer transition-colors">
                                Logout
                            </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <NavLink 
                            to="/login" 
                            className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-pink-600 transition-colors"
                        >
                            Login
                        </NavLink>
                        <NavLink 
                            to="/register" 
                            className="px-5 py-2 text-sm font-semibold text-white bg-pink-600 hover:bg-pink-700 rounded-full shadow-md shadow-pink-100 active:scale-95 transition-all"
                        >
                            Register
                        </NavLink>
                    </div>
                )}
            </div>

        </div>
    </header>
    );
}

export default Header;
