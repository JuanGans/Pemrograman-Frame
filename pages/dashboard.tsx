import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router"; // Import useRouter untuk navigasi setelah logout
import withAuth from "../hoc/withAuth"; // Pastikan withAuth diimpor dengan benar

interface Booking {
  id: number;
  court: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: string;
}

function Home() {
  const router = useRouter(); // Untuk navigasi setelah logout
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [monthlySummary, setMonthlySummary] = useState<{ [key: string]: { income: number; expense: number; pending: number } }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings/get-all");
        const data = await res.json();
        console.log("Data terbaru dari API:", data);

        if (Array.isArray(data)) {
          const sortedBookings = [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          console.log("Data setelah sorting:", sortedBookings);
          setBookings(sortedBookings.slice(0, 5));

          const summary: { [key: string]: { income: number; expense: number; pending: number } } = {};
          sortedBookings.forEach((booking: Booking) => {
            const monthYear = new Date(booking.date).toLocaleDateString("id-ID", { month: "long", year: "numeric" });

            if (!summary[monthYear]) {
              summary[monthYear] = { income: 0, expense: 0, pending: 0 };
            }

            if (booking.status === "Confirmed" || booking.status === "Done") {
              summary[monthYear].income += booking.price;
            } else if (booking.status === "Canceled") {
              summary[monthYear].expense += booking.price;
            } else if (booking.status === "Pending") {
              summary[monthYear].pending += booking.price;
            }
          });

          setMonthlySummary(summary);
        } else {
          console.error("API tidak mengembalikan array:", data);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
      setLoading(false);
    };

    fetchBookings();
    const interval = setInterval(fetchBookings, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fungsi Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Hapus token dari localStorage
    console.log("Logout clicked"); // Debugging
    router.push("/login"); // Redirect ke halaman login
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-white mb-4">🏆 Futsal Management System</h1>

      <div className="flex gap-4 justify-center mb-6">
        <Link href="/reservations">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">📅 Reservasi Lapangan</button>
        </Link>
        <Link href="/finance">
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg">💰 Manajemen Keuangan</button>
        </Link>
        {/* Tambahkan Tombol Logout */}
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-black mb-2">📅 Reservasi Terbaru</h2>
          {loading ? (
            <p className="text-gray-500">Memuat data...</p>
          ) : (
            <ul>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <li key={booking.id} className="p-2 border-b">
                    <span className="font-bold text-black">{booking.court}</span> - {" "}
                    <span className="text-black">
                      {new Date(booking.date).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })} {" "}
                      {booking.time}
                    </span>
                    <span className="text-black">
                      ⏳ {booking.duration} jam | 💰 Rp{booking.price.toLocaleString("id-ID")}
                    </span>
                    <span
                      className={`ml-2 px-2 py-1 text-sm rounded ${
                        booking.status === "Confirmed"
                          ? "bg-green-500 text-white"
                          : booking.status === "Canceled"
                          ? "bg-red-500 text-white"
                          : booking.status === "Done"
                          ? "bg-gray-500 text-white"
                          : booking.status === "Pending"
                          ? "bg-yellow-500 text-black"
                          : "bg-gray-500 text-white"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">Belum ada reservasi</p>
              )}
            </ul>
          )}
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-black mb-2">📅 Rekapitulasi Keuangan Bulanan</h2>
          <ul>
            {Object.entries(monthlySummary).length > 0 ? (
              Object.entries(monthlySummary).map(([month, { income, expense, pending }]) => (
                <li key={month} className="p-2 border-b">
                  <span className="font-bold text-black">{month}</span> <br />
                  ✅ <span className="text-black">Total Pemasukan</span>: 
                  <span className="text-green-500"> Rp{income.toLocaleString("id-ID")}</span> <br />
                  ❌ <span className="text-black">Total Pembatalan</span>: 
                  <span className="text-red-500"> Rp{expense.toLocaleString("id-ID")}</span> <br />
                </li>
              ))
            ) : (
              <p className="text-gray-500">Belum ada data keuangan</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Bungkus Home dengan withAuth
export default withAuth(Home);
