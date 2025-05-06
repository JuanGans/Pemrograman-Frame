import { useState } from "react";
import { useRouter } from "next/router";
import { Eye, EyeOff, Home } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } else {
      setError(data.message || "Gagal login");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center font-sans"
      style={{ backgroundImage: `url('/bg1.jpg')` }}
    >
      <div className="w-full max-w-md bg-white/30 backdrop-blur-lg shadow-lg rounded-lg p-10 relative">
        {/* Tombol Home */}
        <button
          onClick={() => router.push("/")}
          className="absolute top-4 left-4 text-blue-900 hover:text-blue-700 transition"
          title="Kembali ke Beranda"
        >
          <Home size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">Masuk</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <label className="block text-sm font-semibold text-gray-100">Email</label>
            <input
              type="email"
              placeholder="Masukkan email"
              className="w-full border border-gray-300 rounded px-4 py-2 mt-1 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-100">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="******"
                className="w-full border border-gray-300 rounded px-4 py-2 mt-1 text-black focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-100">
            <a href="/lupa-password" className="text-blue-300 hover:underline">Lupa Password</a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 transition"
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => router.push("/register")}
            className="w-full bg-gray-600 text-white py-2 rounded"
          >
            Registrasi
          </button>

          <div className="text-center mt-4 text-sm">
            <img src="/logo-poltek.png" alt="Poltek Logo" className="mx-auto h-8" />
          </div>
        </form>
      </div>
    </div>
  );
}
