"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { log } from "console";


export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup Success", response.data);
            router.push("/login");
        } catch (error: any) {
            console.log("Signup Failed", error.message);
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
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
                <p className="text-gray-400 text-sm mb-8">Login in to your account</p>
                <hr className="border-gray-700 mb-8"/>
                
                <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="username">
                    Username
                </label>
                <input
                    className="w-full p-3 border border-gray-600 rounded-lg mb-6 bg-gray-700 bg-opacity-50 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 transition"
                    type="text"
                    id="username"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="your_username"
                />
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
                    required
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
                    required
                />
                
                <button
                    onClick={onSignup}
                    className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-lg font-semibold transition duration-200 transform hover:scale-105 shadow-lg mb-6">
                    {buttonDisabled ? "Fill in all fields" : "Sign Up"}
                </button>
                
                <p className="text-gray-400 text-center text-sm">
                    Already have an account? <Link href="/verify" className="text-blue-400 hover:text-blue-300 font-semibold transition">
                        Log in here
                    </Link>
                </p>
            </div>
        </div>
    );
}