"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user)
            console.log("login Success", response.data);
            toast.success("Login successful")
            router.push("/profile");
            
        } catch (error: any) {
            console.log("login Failed", error.message)
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    if(loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
                <style jsx>{`
                    .loader {
                        border-top-color: #3498db;
                        animation: spin 1s linear infinite;
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-linear-to-br from-gray-950 via-gray-900 to-gray-800">
            <div className="bg-linear-to-br from-gray-800 to-gray-900 p-10 rounded-2xl shadow-2xl border border-gray-700 backdrop-blur-sm w-full max-w-md">
                <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-blue-600">Welcome Back</h1>
                <p className="text-gray-400 text-sm mb-8">Sign in to your account</p>
                <hr className="border-gray-700 mb-8"/>
                
                <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="email">
                    Email Address
                </label>
                <input
                    className="w-full p-3 border border-gray-600 rounded-lg mb-6 bg-gray-700 bg-opacity-50 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 transition"
                    type="email"
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="your@email.com"
                />
                
                <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    className="w-full p-3 border border-gray-600 rounded-lg mb-8 bg-gray-700 bg-opacity-50 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 transition"
                    type="password"
                    id="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="••••••••"
                />
                
                <button
                    onClick={onLogin}
                    className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-lg font-semibold transition duration-200 transform hover:scale-105 shadow-lg mb-6">
                    {buttonDisabled ? "Fill in all fields" : "Log In"}
                </button>

                // add a link for forget password page

                <p className="text-gray-400 text-center text-sm">
                    <Link href="/forgetpassword" className="text-blue-400 hover:text-blue-300 font-semibold transition">Forget Password?</Link>
                </p>
                
                <p className="text-gray-400 text-center text-sm">
                    Don't have an account? <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-semibold transition">
                        Sign up here
                    </Link>
                </p>
            </div>
        </div>


    );
}