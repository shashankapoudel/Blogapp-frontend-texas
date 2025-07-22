import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../config/api";
import { toast, ToastContainer } from 'react-toastify';

const Register = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!name || !email) {
            toast.error("Please enter both name and email");
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Registration failed");
            }

            toast.success("Registration successful!");
            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 w-full flex justify-center items-center text-[#111111] min-h-screen bg-gray-400">

            <ToastContainer />

            <div className="flex flex-col items-center justify-center w-full max-w-md gap-6 rounded-xl p-8 bg-white shadow-2xl">

                <h2 className="text-3xl font-bold mb-4 text-yellow-500">Register your account</h2>

                <div className="flex flex-col w-full gap-2">
                    <label className="text-yellow-500">Your Name</label>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-yellow-500 rounded-md w-full p-2"
                    />
                </div>

                <div className="flex flex-col w-full gap-2">
                    <label className="text-yellow-500">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-yellow-500 rounded-md w-full p-2"
                    />
                </div>

                <button
                    onClick={handleRegister}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 border px-4 py-2 w-1/2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {isLoading && (
                        <span className="border-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin"></span>
                    )}
                    {isLoading ? "Registering..." : "Register"}
                </button>

                <div className="flex justify-center items-center">
                    <p className="font-semibold">If you already have an account, <Link to='/login'><span className="text-yellow-500 font-semibold underline">Login</span></Link></p>
                </div>

            </div>
        </div>
    );
};

export default Register;
