"use client";

import axios from "axios";
import { log } from "console";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    
    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token });
            setVerified(true);
        } catch (err:any) {
            setError(true);
            console.log(err.response.data);            
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0){
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-4">Verify Your Email</h1>
            <h2 className="text-xl">{token ? `Verification token: ${token}` : "No verification token found"}</h2>

            {verified && (
                <div className="text-2xl"><p>Email verified successfully! 
                    <Link href="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link></p>
                </div>
            )}
            {error && (
                <div className="text-2xl text-red-500">Email verification failed!</div>
            )}
        </div>
    )

}