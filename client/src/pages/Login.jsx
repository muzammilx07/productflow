import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return false;
    }
    setError("");
    return true;
  };

  const login = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();
      localStorage.setItem("firebaseToken", token);
      console.log(token)
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  // Prefill demo credentials
  const fillDemoCredentials = () => {
    setEmail("test@example.com");
    setPassword("12345678");
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#18181B]">
      {/* Top bar with back button */}
      <div className="flex items-center px-6 py-4 bg-[#232329] shadow-md">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-300 font-semibold"
        >
          <HiArrowLeft className="text-lg" />
          Back to Home
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="w-full max-w-md bg-[#232329] rounded-2xl shadow-xl p-10 flex flex-col items-center border border-[#27272A]">
          <h2 className="text-3xl font-bold mb-8 text-center text-white tracking-wide">
            Sign In to Your Account
          </h2>

          {error && (
            <div className="mb-4 text-red-500 bg-white border border-red-200 rounded px-3 py-2 text-sm w-full text-center">
              {error}
            </div>
          )}

          <form onSubmit={login} className="w-full flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 bg-[#18181B] border border-[#27272A] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-[#18181B] border border-[#27272A] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black font-semibold py-2 rounded-lg transition hover:bg-gray-200"
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={fillDemoCredentials}
              className="w-full bg-gray-700 text-white font-semibold py-2 rounded-lg transition hover:bg-gray-600 mt-2"
            >
              Use Demo Credentials
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-gray-400">
            Forgot your password?{" "}
            <a href="#" className="text-gray-300 hover:underline">
              Reset it
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
