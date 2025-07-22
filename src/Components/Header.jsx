import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BlogModal from "./BlogModal";

const Header = ({ user, setUser, triggerRefetch }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("userInfo");
        setUser(null);
        navigate("/register");
    };


    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">MERN Blog</h1>
            <nav className="flex gap-4 items-center">
                {user ? (
                    <div className="flex items-center gap-4">
                        {user.user.roles === "admin" && (
                            <button
                                onClick={() => setIsOpen(true)}
                                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition"
                            >
                                Add Blog
                            </button>
                        )}
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
                        >
                            Logout
                        </button>

                        {isOpen && (

                            <BlogModal
                                onClose={() => setIsOpen(false)}
                                triggerRefetch={triggerRefetch}

                            />

                        )}
                    </div>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="hover:underline hover:text-gray-200"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="hover:underline hover:text-gray-200"
                        >
                            Register
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
