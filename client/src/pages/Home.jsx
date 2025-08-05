import { useNavigate } from "react-router-dom";
import React from "react";

export default function Home() {
    const navigate = useNavigate();

    return (
      <div className="min-h-screen flex flex-col bg-[#18181B] text-white">
        {/* Navbar */}
        <nav className="w-full px-8 py-4 flex items-center justify-between border-b border-[#27272A] bg-[#18181B] shadow-sm z-10">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl tracking-tight">
              ProductFlow
            </span>
          </div>
          <div className="flex gap-6 items-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-sm px-4 py-2 rounded border border-[#27272A] hover:bg-[#232329] transition"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate("/login")}
              className="text-sm px-4 py-2 rounded bg-white text-black font-semibold hover:bg-gray-200 transition"
            >
              Login
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="w-full max-w-3xl mt-16 mb-10 bg-[#232329] border border-[#27272A] rounded-2xl shadow-lg p-10 flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white tracking-tight">
              Product Form Workflow App
            </h1>
            <p className="text-lg text-gray-300 mb-8 text-center max-w-xl">
              A secure, multi-step product submission and review platform
              powered by Firebase Auth, Node.js backend, and an intuitive form
              system. Seamlessly manage product data with a user-friendly
              interface.
            </p>
            <div className="flex justify-center mb-8">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1055/1055644.png"
                alt="Product Workflow Illustration"
                className="w-28 h-28 rounded-lg border border-[#27272A] bg-[#18181B]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 w-full">
              <div className="bg-[#18181B] border border-[#27272A] rounded-xl shadow p-6 flex flex-col items-center">
                <span className="text-3xl mb-2">🔒</span>
                <h3 className="font-semibold text-lg mb-1 text-white">
                  Secure Auth
                </h3>
                <p className="text-gray-400 text-sm text-center">
                  Powered by Firebase Authentication for robust user security.
                </p>
              </div>
              <div className="bg-[#18181B] border border-[#27272A] rounded-xl shadow p-6 flex flex-col items-center">
                <span className="text-3xl mb-2">📝</span>
                <h3 className="font-semibold text-lg mb-1 text-white">
                  Multi-Step Forms
                </h3>
                <p className="text-gray-400 text-sm text-center">
                  Intuitive, step-by-step product submission and review process.
                </p>
              </div>
              <div className="bg-[#18181B] border border-[#27272A] rounded-xl shadow p-6 flex flex-col items-center">
                <span className="text-3xl mb-2">📊</span>
                <h3 className="font-semibold text-lg mb-1 text-white">
                  Dashboard Insights
                </h3>
                <p className="text-gray-400 text-sm text-center">
                  Manage and track product data with a modern dashboard
                  interface.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full">
              <button
                onClick={() => navigate("/login")}
                className="bg-white text-black font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-gray-200 transition w-full sm:w-auto"
              >
                Login to Get Started
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-[#18181B] border border-[#27272A] text-white px-6 py-3 rounded-xl shadow-md hover:bg-[#232329] transition w-full sm:w-auto"
              >
                View Dashboard
              </button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full border-t border-[#27272A] bg-[#18181B] py-8 flex flex-col md:flex-row justify-between items-center px-8 gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="font-semibold text-white">
              Made with ❤️ by{" "}
              <a href="https://muzammils.vercel.app/">muzammil</a>
            </span>
            <span className="hidden md:inline text-gray-500">|</span>
            <a
              href="https://muzammils.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white text-gray-400"
            >
              Portfolio
            </a>
            <span className="hidden md:inline text-gray-500">|</span>
            <a
              href="https://github.com/muzammilx07"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white text-gray-400"
            >
              GitHub
            </a>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <a
              href="https://github.com/your-github/productflow-client"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white text-gray-400"
            >
              Code
            </a>
          </div>
        </footer>
      </div>
    );
}
