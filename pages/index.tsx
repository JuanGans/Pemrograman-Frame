import { useEffect, useState } from "react";
import Link from "next/link";

interface Booking {
  id: number;
  court: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: string;
}

interface Transaction {
  id: number;
  type: "income" | "expense";
  amount: number;
  description: string;
  date: string;
}

export default function Home() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [monthlySummary, setMonthlySummary] = useState<{ [key: string]: { income: number; expense: number } }>({});

  useEffect(() => {
    fetch("/api/bookings/get-all")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBookings(data.slice(0, 5));
  
          // Buat rekapitulasi bulanan dari bookings
          const summary: { [key: string]: { income: number; expense: number } } = {};
          data.forEach((booking: Booking) => {
            const monthYear = new Date(booking.date).toLocaleDateString("id-ID", { month: "long", year: "numeric" });
  
            if (!summary[monthYear]) {
              summary[monthYear] = { income: 0, expense: 0 };
            }
  
            if (booking.status === "Confirmed" || booking.status === "Done") {
              summary[monthYear].income += booking.price;
            } else if (booking.status === "Canceled") {
              summary[monthYear].expense += booking.price;
            }
          });
  
          setMonthlySummary(summary);
        } else {
          console.error("API tidak mengembalikan array:", data);
        }
      });
  }, []);
  

  // 🔥 **Fungsi untuk menghitung rekap bulanan**
  const processMonthlySummary = (data: Transaction[]) => {
    const summary: { [key: string]: { income: number; expense: number } } = {};

    data.forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthKey = date.toLocaleDateString("id-ID", { month: "long", year: "numeric" }); // Format: "Maret 2025"

      if (!summary[monthKey]) {
        summary[monthKey] = { income: 0, expense: 0 };
      }

      if (transaction.type === "income") {
        summary[monthKey].income += transaction.amount;
      } else {
        summary[monthKey].expense += transaction.amount;
      }
    });

    setMonthlySummary(summary);
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Reservasi Lapangan */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-black mb-2">📅 Reservasi Terbaru</h2>
          <ul>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <li key={booking.id} className="p-2 border-b">
                  <span className="font-bold text-black">{booking.court}</span> -{" "}
                  <span className="text-black">
                    {new Date(booking.date).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}{" "}
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
        </div>

        {/* 📅 Rekapitulasi Keuangan Bulanan */}
        <div className="bg-white p-4 rounded-lg shadow">
  <h2 className="text-xl font-semibold text-black mb-2">📅 Rekapitulasi Keuangan Bulanan</h2>
  <ul>
    {Object.entries(monthlySummary).length > 0 ? (
      Object.entries(monthlySummary).map(([month, { income, expense }]) => (
        <li key={month} className="p-2 border-b">
          <span className="font-bold text-black">{month}</span> <br />
          ✅ <span className="text-black">Total Pemasukan</span>: 
          <span className="text-green-500"> Rp{income.toLocaleString("id-ID")}</span> <br />
          ❌ <span className="text-black">Total Pembatalan </span>: 
          <span className="text-red-500"> Rp{expense.toLocaleString("id-ID")}</span>
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
