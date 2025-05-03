import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root", // Ganti sesuai dengan user database
      password: "", // Ganti sesuai dengan password database
      database: "futsal_management", // Ganti sesuai dengan nama database kamu
    });

    const [rows] = await connection.execute("SELECT * FROM bookings");
    await connection.end();

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
