import { useState, useEffect } from "react";

interface Transaction {
  id?: number;
  type: "income" | "expense";
  amount: number;
  description: string;
  date: string;
}

interface Booking {
  id: number;
  date: string;
  price: number;
  status: string;
}

export default function Finance() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // Ambil transaksi keuangan
    fetch("/api/finance/get-all")
      .then((res) => res.json())
      .then((data) => setTransactions(data));

    // Ambil data reservasi
    fetch("/api/bookings/get-all")
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  // Fungsi format bulan dan tahun (contoh: "Maret 2025")
  const formatMonthYear = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
  };

  // **1️⃣ Mengelompokkan pemasukan hanya untuk reservasi yang "Confirmed" atau "Done"**
  const confirmedIncome = bookings
    .filter((booking) => booking.status === "Confirmed" || booking.status === "Done")
    .reduce((acc: { [key: string]: number }, booking) => {
      const formattedDate = new Date(booking.date).toLocaleDateString("id-ID");
      acc[formattedDate] = (acc[formattedDate] || 0) + booking.price;
      return acc;
    }, {});

  // **2️⃣ Mengelompokkan reservasi yang "Canceled" ke daftar terpisah**
  const canceledTransactions = bookings
    .filter((booking) => booking.status === "Canceled")
    .reduce((acc: { [key: string]: number }, booking) => {
      const formattedDate = new Date(booking.date).toLocaleDateString("id-ID");
      acc[formattedDate] = (acc[formattedDate] || 0) + booking.price;
      return acc;
    }, {});

  // **3️⃣ Mengelompokkan data berdasarkan bulan untuk total pemasukan dan pengeluaran bulanan**
  const monthlySummary: { [key: string]: { income: number; expense: number } } = {};
  
  bookings.forEach((booking) => {
    const monthYear = formatMonthYear(booking.date);
    if (!monthlySummary[monthYear]) {
      monthlySummary[monthYear] = { income: 0, expense: 0 };
    }
    if (booking.status === "Confirmed" || booking.status === "Done") {
      monthlySummary[monthYear].income += booking.price;
    } else if (booking.status === "Canceled") {
      monthlySummary[monthYear].expense += booking.price;
    }
  });

  // **4️⃣ Format ulang data pemasukan dari reservasi yang "Confirmed" atau "Done"**
  const confirmedTransactions: Transaction[] = Object.entries(confirmedIncome).map(([date, amount]) => ({
    type: "income",
    amount,
    description: `Pemasukan Reservasi ${date}`,
    date,
  }));

  // **5️⃣ Format ulang data transaksi untuk reservasi "Canceled"**
  const canceledList: Transaction[] = Object.entries(canceledTransactions).map(([date, amount]) => ({
    type: "expense",
    amount,
    description: `Reservasi Dibatalkan ${date}`,
    date,
  }));

  // **6️⃣ Format ulang data transaksi bulanan**
  const monthlySummaryList: Transaction[] = Object.entries(monthlySummary).flatMap(([month, { income, expense }]) => [
    {
      type: "income" as "income",  // Memastikan TypeScript memahami bahwa ini adalah tipe "income"
      amount: income,
      description: `Total Pemasukan Bulan ${month}`,
      date: month,
    },
    {
      type: "expense" as "expense", // Memastikan TypeScript memahami bahwa ini adalah tipe "expense"
      amount: expense,
      description: `Total Pengeluaran Bulan ${month}`,
      date: month,
    }
  ]);

  // Gabungkan semua transaksi yang sudah dikonfirmasi/done
  const allConfirmedTransactions = [...transactions, ...confirmedTransactions];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-white mb-4">💰 Manajemen Keuangan</h1>

      {/* **Bagian Pemasukan (Confirmed / Done)** */}
      <h2 className="text-xl font-semibold text-white mt-4 mb-2">✅ Keuangan Reservasi (Confirmed / Done)</h2>
      <ul className="bg-white p-4 rounded-lg shadow">
        {allConfirmedTransactions.length > 0 ? (
          allConfirmedTransactions.map((transaction, index) => (
            <li key={index} className="p-2 border-b text-black">
              <span className="font-bold">{transaction.description}</span> <br />
              <span className="text-black"> Rp{transaction.amount.toLocaleString()}</span>
              <span className="ml-2 px-2 py-1 text-sm rounded bg-green-500 text-white">Pemasukan</span>
            </li>
          ))
        ) : (
          <p className="text-gray-500">Belum ada pemasukan dari reservasi</p>
        )}
      </ul>

      {/* **Bagian Reservasi yang Dibatalkan** */}
      <h2 className="text-xl font-semibold text-white mt-6 mb-2">❌ Keuangan Reservasi (Canceled)</h2>
      <ul className="bg-white p-4 rounded-lg shadow">
        {canceledList.length > 0 ? (
          canceledList.map((transaction, index) => (
            <li key={index} className="p-2 border-b text-black">
              <span className="font-bold">{transaction.description}</span> <br />
              <span className="text-black"> Rp{transaction.amount.toLocaleString()}</span>
              <span className="ml-2 px-2 py-1 text-sm rounded bg-red-500 text-white">Dibatalkan</span>
            </li>
          ))
        ) : (
          <p className="text-gray-500">Belum ada reservasi yang dibatalkan</p>
        )}
      </ul>

      {/* **Bagian Rekapitulasi Keuangan Bulanan** */}
      <h2 className="text-xl font-semibold text-white mt-6 mb-2">📅 Rekapitulasi Keuangan Bulanan</h2>
      <ul className="bg-white p-4 rounded-lg shadow">
        {monthlySummaryList.length > 0 ? (
          monthlySummaryList.map((transaction, index) => (
            <li key={index} className="p-2 border-b text-black">
              <span className="font-bold">{transaction.description}</span> <br />
              <span className="text-black"> Rp{transaction.amount.toLocaleString()}</span>
              <span className={`ml-2 px-2 py-1 text-sm rounded ${transaction.type === "income" ? "bg-green-500" : "bg-red-500"} text-white`}>
                {transaction.type === "income" ? "Total Pemasukan" : "Total Pembatalan"}
              </span>
            </li>
          ))
        ) : (
          <p className="text-gray-500">Belum ada data rekapitulasi bulan ini</p>
        )}
      </ul>
    </div>
  );
}
