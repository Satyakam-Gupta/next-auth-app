"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [data, setData] = useState("nothing");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout")
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.error("Error occurred while logging out:", error.message);
      toast.error(error.message)
    }
  }

  const getUserDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/users/me")
      console.log(res.data);
      setData(res.data.data.username);
    } catch (error: any) {
      toast.error("Failed to fetch user details");
    } finally {
      setLoading(false);
    }
  }

  const isDataLoaded = data !== "nothing";

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-6">
      {/* Header with Logout Button */}
      <div className="max-w-2xl mx-auto mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">
          Profile
        </h1>
        <button
          onClick={logout}
          className="px-6 py-2 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-red-500/50"
        >
          Logout
        </button>
      </div>

      {/* Main Card */}
      <div className="max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-md rounded-xl border border-slate-700 shadow-2xl p-8">
        {/* User Status Section */}
        <div className="mb-8 pb-8 border-b border-slate-700">
          <h2 className={`text-xl font-semibold transition-all duration-300 ${
            isDataLoaded 
              ? "text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300" 
              : "text-slate-400"
          }`}>
            {isDataLoaded ? "User Profile" : "No user data loaded"}
          </h2>
          
          {isDataLoaded && (
            <p className="text-cyan-300 text-sm mt-2">Username: <span className="font-bold text-white">{data}</span></p>
          )}
        </div>

        {/* Profile Link Section */}
        <div className={`mb-8 p-6 rounded-lg border-2 transition-all duration-300 ${
          isDataLoaded
            ? "bg-blue-500/10 border-blue-400 shadow-lg shadow-blue-500/20"
            : "bg-slate-700/30 border-slate-600"
        }`}>
          <h3 className="text-sm uppercase text-slate-400 tracking-wider mb-4">Profile Link</h3>
          
          {isDataLoaded ? (
            <Link 
              href={`/profile/${data}`}
              className="inline-block px-4 py-2 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg"
            >
              View Profile →
            </Link>
          ) : (
            <p className="text-slate-500 text-sm italic">Nothing to show - fetch user details first</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={getUserDetails}
            disabled={loading}
            className={`flex-1 py-3 font-semibold rounded-lg transition-all duration-200 ${
              loading
                ? "bg-slate-600 text-slate-400 cursor-not-allowed opacity-50"
                : "bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/50"
            }`}
          >
            {loading ? "Loading..." : "Get User Details"}
          </button>

          <button
            onClick={logout}
            className="flex-1 py-3 bg-linear-to-r from-slate-700 to-slate-600 hover:from-slate-800 hover:to-slate-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg"
          >
            Logout
          </button>
        </div>

        {/* Status Indicator */}
        <div className={`mt-8 pt-8 border-t border-slate-700 flex items-center gap-2 text-sm ${
          isDataLoaded ? "text-green-400" : "text-slate-500"
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            isDataLoaded ? "bg-green-400" : "bg-slate-500"
          }`}></div>
          {isDataLoaded ? "User data loaded" : "Waiting for user data"}
        </div>
      </div>
    </div>
  );
}