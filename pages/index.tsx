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

  useEffect(() => {
    fetch("/api/bookings/get-all")
      .then((res) => res.json())
      .then((data) => {
        console.log("Bookings Response:", data); // Debugging
        if (Array.isArray(data)) {
          setBookings(data.slice(0, 5));
        } else {
          console.error("API tidak mengembalikan array:", data);
        }
      });

    fetch("/api/finance/get-all")
      .then((res) => res.json())
      .then((data) => {
        console.log("Finance Response:", data); // Debugging
        if (Array.isArray(data)) {
          setTransactions(data.slice(0, 5));
        } else {
          console.error("API tidak mengembalikan array:", data);
        }
      });
  }, []);

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

        {/* Manajemen Keuangan */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-black mb-2">💰 Transaksi Keuangan</h2>
          <ul>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <li key={transaction.id} className="p-2 border-b">
                  <span className="font-bold text-black">{transaction.description}</span> - Rp
                  {transaction.amount.toLocaleString()}
                  <span
                    className={`ml-2 px-2 py-1 text-sm rounded ${
                      transaction.type === "income" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                  >
                    {transaction.type === "income" ? "Pemasukan" : "Pengeluaran"}
                  </span>
                </li>
              ))
            ) : (
              <p className="text-gray-500">Belum ada transaksi</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
