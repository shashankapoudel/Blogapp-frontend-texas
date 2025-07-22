import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../config/api";
import { toast, ToastContainer } from 'react-toastify';

const Login = ({ user, setUser }) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)



    const handleLogin = async () => {

        if (!name || !email) {
            toast.error("Please enter both email and name")
            return;
        }

        setIsLoading(true)
        try {
            const res = await fetch(`${BASE_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email })
            })

            const data = await res.json()
            console.log(data.data)
            localStorage.setItem("userInfo", JSON.stringify(data.data));
            setUser(data.data)

            if (!res.ok) {
                console.log("Registration failed")
            }
            toast.success("Registration successfull")
            navigate('/')

        } catch (error) {
            toast.error(error.message || "Something went wrong");
        } finally {

            setIsLoading(false)
        }


    };

    return (
        <div className="p-4 w-full flex justify-center items-center min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-300">

            <div className="flex flex-col items-center justify-center w-full max-w-md gap-6 rounded-xl p-8 bg-white shadow-2xl">

                <h2 className="text-3xl font-bold text-yellow-600">Login to your account</h2>

                <div className="flex flex-col w-full gap-2">
                    <label className="text-yellow-700 font-medium">Your Name</label>
                    <input
                        type="text"

                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-yellow-400 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                </div>

                <div className="flex flex-col w-full gap-2">
                    <label className="text-yellow-700 font-medium">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-yellow-400 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                </div>

                <button
                    onClick={handleLogin}
                    className="w-1/2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-md shadow-md transition duration-200">
                    Login
                </button>

                <div className="text-center">
                    <p className="font-medium text-gray-700">
                        If you don't have an account,&nbsp;
                        <Link to='/register' className="text-yellow-600 underline font-semibold">Register</Link>
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Login;
