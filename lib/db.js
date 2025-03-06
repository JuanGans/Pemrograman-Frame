import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root", // Ganti dengan username MySQL
  password: "", // Isi dengan password MySQL (kosong jika default XAMPP/Laragon)
  database: "futsal_management", // Nama database
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
