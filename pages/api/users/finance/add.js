import pool from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  const { type, amount, description } = req.body;

  try {
    await pool.query(
      "INSERT INTO transactions (type, amount, description) VALUES (?, ?, ?)",
      [type, amount, description]
    );
    res.status(201).json({ message: "Transaction added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Transaction failed" });
  }
}
