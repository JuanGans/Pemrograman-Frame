import { useState, useEffect } from "react";

interface Transaction {
  id: number;
  type: "income" | "expense";
  amount: number;
  description: string;
  date: string;
}

export default function Finance() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch("/api/finance/get-all")
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">💰 Manajemen Keuangan</h1>
      <ul className="bg-white p-4 rounded-lg shadow">
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <li key={transaction.id} className="p-2 border-b">
              <span className="font-bold">{transaction.description}</span> - Rp{transaction.amount.toLocaleString()}
              <span className={`ml-2 px-2 py-1 text-sm rounded ${transaction.type === "income" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                {transaction.type === "income" ? "Pemasukan" : "Pengeluaran"}
              </span>
            </li>
          ))
        ) : (
          <p className="text-gray-500">Belum ada transaksi</p>
        )}
      </ul>
    </div>
  );
}
