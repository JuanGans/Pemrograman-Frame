import db from "@/lib/db"; // Sesuaikan dengan konfigurasi database-mu

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { court, date, time, phone_number, duration } = req.body;

    if (!court || !date || !time || !phone_number || !duration) {
      return res.status(400).json({ message: "Semua field harus diisi!" });
    }

    const pricePerHour = 70000;
    const totalPrice = duration * pricePerHour;

    try {
      await db.query(
        "INSERT INTO bookings (court, date, time, status, phone_number, duration, price) VALUES (?, ?, ?, 'Pending', ?, ?, ?)",
        [court, date, time, phone_number, duration, totalPrice]
      );

      const allBookings = await db.query("SELECT * FROM bookings");
      res.status(201).json(allBookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Gagal menambahkan reservasi" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
