import { useState } from "react";
import { useRouter } from "next/router";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.message || "Registrasi gagal");
      return;
    }

    router.push("/login");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/bg1.jpg')" }}
    >
      <div className="bg-white/30 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-white text-center">Register</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Nama Lengkap"
            className="w-full p-2 border rounded text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-2 border rounded text-black pr-10"
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
          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition">
            Register
          </button>
        </form>
        <p className="mt-4 text-sm text-white text-center">
          Sudah punya akun?{" "}
          <a href="/login" className="text-blue-300 underline hover:text-blue-500">Login</a>
        </p>
      </div>
    </div>
  );
}
