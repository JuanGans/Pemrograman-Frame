import pool from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID diperlukan" });
  }

  try {
    console.log("Menerima request hapus reservasi:", { id });

    const [result] = await pool.query("DELETE FROM bookings WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Reservasi tidak ditemukan" });
    }

    return res.status(200).json({ success: true, message: "Reservasi dihapus" });
  } catch (error) {
    console.error("Database Error:", error);
    return res.status(500).json({ error: "Gagal menghapus reservasi" });
  }
}
