import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";

export default function Home() {
  const [selectedField, setSelectedField] = useState<any>(null);

  const fields = [
    {
      name: "Lapangan Futsal A",
      image: "https://jasakontraktorlapangan.id/wp-content/uploads/2023/06/Jasa-Pembuatan-Lapangan-Futsal-Kendari.jpg",
      description: "Lapangan indoor berstandar nasional dengan lantai vinyl dan pencahayaan LED.",
    },
    {
      name: "Lapangan Futsal B",
      image: "https://storage.googleapis.com/data.ayo.co.id/photos/77445/SEO%20HDI%204/80.%20Cara%20Cepat%20dan%20Mudah%20Menyewa%20Lapangan%20Futsal%20untuk%20Tim%20Anda.jpg",
      description: "Cocok untuk latihan tim, tersedia ruang ganti dan tribun penonton.",
    },
    {
      name: "Lapangan Futsal C",
      image: "https://i0.wp.com/ritaelfianis.id/wp-content/uploads/2023/08/10-Cara-Mengelola-Bisnis-Lapangan-Futsal-Untuk-Pemula.jpeg",
      description: "Lapangan outdoor dan pencahayaan malam hari.",
    },
    {
      name: "Lapangan Futsal D",
      image: "https://paradeapparel.id/wp-content/uploads/2021/01/Vinyl-compressed-1024x681.jpg",
      description: "Tersedia 3 lapangan indoor ber-AC dengan lantai kayu.",
    },
    {
      name: "Lapangan Futsal E",
      image: "https://jersey-printing.com/images/upload/21.%20Lapangan%20Futsal%20Sintetis,%20Enak%20untuk%20Main%20Futsal%20atau%20Tidak.jpg",
      description: "Lapangan dengan permukaan sintetis dan tersedia pelatih profesional.",
    },
    {
      name: "Lapangan Futsal F",
      image: "https://vendors.id/wp-content/uploads/2024/03/ezgif-3-639eb0bef5.webp",
      description: "Tersedia untuk turnamen sekolah atau komunitas dengan fasilitas lengkap.",
    },
  ];

  return (
    <div className="scroll-smooth font-[Poppins]">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Hero + Navbar */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center text-center px-4"
        style={{ backgroundImage: "url('/futsal.jpg')" }}
      >
        <nav className="absolute top-0 left-0 right-0 z-50 py-4 px-6 flex justify-between items-center">
          <div>
            <img src="/polinema.png" className="w-10 h-10 object-contain" />
          </div>
          <div className="flex flex-1 justify-center">
            <ul className="flex space-x-10 text-white font-medium text-lg">
              <li><a href="#home" className="hover:text-blue-300">Home</a></li>
              <li><a href="#about" className="hover:text-blue-300">About</a></li>
              <li><a href="#feature" className="hover:text-blue-300">Feature</a></li>
              <li><a href="#team" className="hover:text-blue-300">Team</a></li>
              <li><a href="#contact" className="hover:text-blue-300">Contact</a></li>
            </ul>
          </div>
          <Link href="/login" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
            Sign In
          </Link>
        </nav>

        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg mt-24">
          Selamat Datang di Website Sport Center JTI POLINEMA!
        </h1>
        <p className="text-white max-w-2xl drop-shadow-md">
          Tempat booking lapangan, jadwal latihan, dan informasi seputar sport center JTI Polinema dengan mudah dan cepat.
        </p>
      </section>

      {/* About */}
      <section id="about" className="bg-blue-100 py-10">
        <div className="text-center text-blue-900 text-2xl font-semibold">Tentang</div>
        <p className="text-blue-900 max-w-xl mx-auto drop-shadow-md">
          Platform digital untuk melakukan pemesanan lapangan dan melihat jadwal kegiatan olahraga di lingkungan JTI Polinema.
        </p>
      </section>

      {/* Feature */}
      <section id="feature" className="bg-white text-center py-16 mb-16">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Latihan Jadi Lebih Mudah</h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Dengan proses pendaftaran yang simpel dan sistem booking lokal, reservasi jadwalmu makin praktis.
        </p>
        <Link href="/login" className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-700">
          Book Now
        </Link>
      </section>

      {/* Interactive Field Section */}
      <section className="bg-blue-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 py-10 mb-16">
        {fields.map((field, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-lg p-4 hover:scale-105 transition cursor-pointer"
            onClick={() => setSelectedField(field)}
          >
            <img src={field.image} alt={field.name} className="rounded-md mb-3 w-full h-48 object-cover" />
            <h3 className="text-blue-900 font-bold mb-2">{field.name}</h3>
            <p className="text-gray-600 text-sm">{field.description}</p>
          </div>
        ))}
      </section>

      {/* Modal Detail */}
      {selectedField && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-6 rounded-lg max-w-md w-full text-center relative">
            <button className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl" onClick={() => setSelectedField(null)}>×</button>
            <img src={selectedField.image} alt={selectedField.name} className="rounded-md mb-4 w-full h-48 object-cover" />
            <h3 className="text-blue-900 font-bold text-xl mb-2">{selectedField.name}</h3>
            <p className="text-gray-700 mb-4">{selectedField.description}</p>
            <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Pesan Sekarang</Link>
          </div>
        </div>
      )}

      {/* Team */}
      <section id="team" className="relative text-center mb-16 py-16 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm"
          style={{ backgroundImage: "url('https://c4.wallpaperflare.com/wallpaper/483/576/977/abstract-hexagon-simple-minimalism-wallpaper-preview.jpg')" }}
        ></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white mb-6">The creative team behind the door</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              ["Raiden Shogun", "2241720001", "https://i.pinimg.com/originals/0b/7a/08/0b7a0825860020c2deada55de1b938c9.gif"],
              ["Yae Miko", "2241720003", "https://i.pinimg.com/originals/9b/ac/bd/9bacbd053fd1ae07faa9a5557d3cf5b4.gif"],
              ["Juan Felix", "2241720042", "/juan.jpg"],
              ["Rias Gremory", "2241720004", "https://i.pinimg.com/originals/54/35/0e/54350ef2508decb79038af9a90d43f15.gif"],
              ["Miku Nakano", "2241720005", "https://www.icegif.com/wp-content/uploads/2022/08/icegif-243.gif"],
            ].map(([name, nim, image], i) => (
              <div key={i} className="flex flex-col items-center">
                <img src={image} alt={name} className="w-24 h-24 rounded-full object-cover mb-2" />
                <p className="text-white font-semibold">{name}</p>
                <p className="text-gray-300 text-sm">{nim}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-blue-100 py-12 px-4">
        <h2 className="text-center text-2xl font-bold text-blue-900 mb-8">Frequently asked questions</h2>
        <div className="max-w-2xl mx-auto space-y-4">
          {[
            ["Apa saja fasilitas yang tersedia di sport center?", "Sport center menyediakan lapangan futsal, gym, kolam renang, dan area parkir luas."],
            ["Bagaimana cara melakukan reservasi lapangan?", "Reservasi dapat dilakukan melalui website atau datang langsung ke resepsionis sport center."],
            ["Apakah tersedia layanan pelatih pribadi?", "Ya, tersedia pelatih pribadi untuk gym dan renang dengan biaya tambahan."],
            ["Berapa jam operasional sport center?", "Sport center buka setiap hari dari pukul 06.00 hingga 22.00 WIB."],
            ["Apakah tersedia program keanggotaan?", "Ya, tersedia berbagai paket keanggotaan bulanan dan tahunan dengan keuntungan khusus."]
          ].map(([q, a], i) => (
            <details key={i} className="bg-white rounded-md shadow px-4 py-3 cursor-pointer">
              <summary className="font-semibold text-blue-900">{q}</summary>
              <p className="mt-2 text-sm text-gray-600">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-blue-900 text-white text-sm px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div>
            <h4 className="font-semibold mb-2">JTI POLINEMA</h4>
            <p>Jl. Soekarno Hatta No.9, Malang</p>
            <p>Telepon: (0341) 404424</p>
            <p>Email: jti@polinema.ac.id</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Blog</h4>
            <p>Artikel & Informasi</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Eksternal</h4>
            <p>Link Terkait</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Social Media</h4>
            <p>Instagram</p>
          </div>
        </div>
        <p className="text-center mt-6">Copyright &copy; 2025 Politeknik Negeri Malang. All rights reserved.</p>
      </footer>
    </div>
  );
}
