import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, oldPassword, newPassword } = req.body;

  if (!email || !oldPassword || !newPassword) {
    return res.status(400).json({ message: "Email, old password, and new password are required" });
  }

  try {
    const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "futsal_management",
    });

    const [rows] = await connection.execute("SELECT * FROM users WHERE email = ?", [email]);

    if (!Array.isArray(rows) || rows.length === 0) {
      await connection.end();
      return res.status(404).json({ message: "Email tidak ditemukan" });
    }

    const user = rows[0] as { id: number; email: string; password: string };

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      await connection.end();
      return res.status(401).json({ message: "Password lama salah" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await connection.execute("UPDATE users SET password = ? WHERE email = ?", [
      hashedNewPassword,
      email,
    ]);

    await connection.end();

    res.status(200).json({ message: "Password berhasil diperbarui" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
}
