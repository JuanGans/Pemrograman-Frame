import { useState, useEffect } from "react";

interface Booking {
  id: number;
  court: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: string;
  phone_number: string;
}

export default function Reservations() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [court, setCourt] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState<number | "">("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const pricePerHour = 70000; // Harga per jam
  const totalPrice = duration ? Number(duration) * pricePerHour : 0;

  // Fungsi untuk mengambil daftar reservasi dari API
  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings/get-all");
      const data = await res.json();
      console.log("Updated bookings:", data);
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  // Ambil daftar reservasi saat komponen pertama kali dirender
  useEffect(() => {
    fetchBookings();
  }, []);

  const handleReserve = async () => {
    if (!court || !date || !time || !duration || !phoneNumber) {
      alert("Harap lengkapi semua field!");
      return;
    }

    const response = await fetch("/api/bookings/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ court, date, time, duration, price: totalPrice, phone_number: phoneNumber }),
    });

    if (response.ok) {
      alert("Reservasi berhasil!");
      setCourt("");
      setDate("");
      setTime("");
      setDuration("");
      setPhoneNumber("");
      await fetchBookings(); // Refresh daftar reservasi setelah menambah data baru
    } else {
      alert("Gagal melakukan reservasi");
    }
  };

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    const response = await fetch(`/api/bookings/update-status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });

    if (response.ok) {
      alert("Status berhasil diperbarui!");
      await fetchBookings(); // Refresh daftar reservasi setelah update
    } else {
      alert("Gagal memperbarui status");
    }
  };

  const handleDelete = async (id: number) => {
    const response = await fetch(`/api/bookings/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      alert("Reservasi berhasil dihapus!");
      await fetchBookings(); // Refresh daftar reservasi setelah menghapus data
    } else {
      alert("Gagal menghapus reservasi");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-white mb-4">📅 Reservasi Lapangan Futsal</h1>
      <div className="mb-4 p-4 bg-gray-100 text-black rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Buat Reservasi Baru</h2>
        <input type="text" placeholder="Nama Lapangan" value={court} onChange={(e) => setCourt(e.target.value)} className="w-full p-2 border rounded mb-2 bg-black text-white" />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 border rounded mb-2 bg-black text-white" />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full p-2 border rounded mb-2 bg-black text-white" />
        <input type="number" placeholder="Durasi (jam)" value={duration} onChange={(e) => setDuration(e.target.value ? Number(e.target.value) : "")} className="w-full p-2 border rounded mb-2 bg-black text-white" />
        <input type="text" placeholder="Harga" value={`Rp ${totalPrice.toLocaleString("id-ID")}`} readOnly className="w-full p-2 border rounded mb-2 bg-gray-200 text-black" />
        <input type="text" placeholder="Nomor Telepon" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full p-2 border rounded mb-2 bg-black text-white" />
        <button onClick={handleReserve} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Reservasi</button>
      </div>

      <h2 className="text-xl font-semibold text-white mt-6 mb-2">Daftar Reservasi</h2>
      <ul className="bg-white text-black p-4 rounded-lg shadow">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <li key={booking.id} className="p-2 border-b flex justify-between items-center">
              <div>
                <span className="font-bold text-black">{booking.court}</span> - {" "}
                <span className="text-black">{booking.date ? new Date(booking.date).toLocaleDateString("id-ID") : "Tanggal tidak tersedia"} {booking.time}</span>
                <br />
                ⏳ {booking.duration || 0} jam | 💰 Rp{(booking.price || 0).toLocaleString("id-ID")}
                <br />
                📞 <span className="text-black">{booking.phone_number || "Nomor tidak tersedia"}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleUpdateStatus(booking.id, "Confirmed")} className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-700">Confirmed</button>
                <button onClick={() => handleUpdateStatus(booking.id, "Canceled")} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-700">Canceled</button>
                <button onClick={() => handleUpdateStatus(booking.id, "Done")} className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">Done</button>
                <button onClick={() => handleDelete(booking.id)} className="bg-black text-white px-3 py-1 rounded text-sm hover:bg-gray-700">Hapus</button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500">Belum ada reservasi</p>
        )}
      </ul>
    </div>
  );
}
