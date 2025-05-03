import pool from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  const { userId, court, date, time } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO bookings (user_id, court, date, time, status) VALUES (?, ?, ?, ?, 'Pending')",
      [userId, court, date, time]
    );
    res.status(201).json({ id: result.insertId, userId, court, date, time, status: "Pending" });
  } catch (error) {
    res.status(500).json({ error: "Booking failed" });
  }
}
