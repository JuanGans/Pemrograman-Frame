import pool from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id, status } = req.body;

  if (!id || !status) {
    return res.status(400).json({ error: "ID dan Status diperlukan" });
  }

  try {
    console.log("Menerima request update status:", { id, status });

    const [result] = await pool.query(
      "UPDATE bookings SET status = ? WHERE id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Reservasi tidak ditemukan" });
    }

    return res.status(200).json({ success: true, message: "Status diperbarui" });
  } catch (error) {
    console.error("Database Error:", error);
    return res.status(500).json({ error: "Gagal memperbarui status" });
  }
}
