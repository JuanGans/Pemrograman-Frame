import { useState } from "react";
import { useRouter } from "next/router";
import { Home } from "lucide-react";

export default function LupaPassword() {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, oldPassword, newPassword }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage(data.message);
    } else {
      setError(data.message);
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
          className="absolute top-4 left-4 text-blue-900 hover:text-blue-700"
          title="Kembali ke Beranda"
        >
          <Home size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {message && <p className="text-green-600 text-sm">{message}</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <label className="block text-sm font-semibold text-gray-100">Email</label>
            <input
              type="email"
              placeholder="Masukkan email"
              className="w-full border rounded px-4 py-2 mt-1 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-100">Password Lama</label>
            <input
              type="password"
              placeholder="Masukkan password lama"
              className="w-full border rounded px-4 py-2 mt-1 text-black"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-100">Password Baru</label>
            <input
              type="password"
              placeholder="Masukkan password baru"
              className="w-full border rounded px-4 py-2 mt-1 text-black"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 transition"
          >
            Simpan Password Baru
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          <button
            onClick={() => router.push("/login")}
            className="text-blue-300 hover:underline"
          >
            Kembali ke Login
          </button>
        </div>
      </div>
    </div>
  );
}
