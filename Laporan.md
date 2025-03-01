# Week 03 - Pengenalan Next.js

**Nama :** Juan Felix Antonio Nathan Tote<br>
**NIM :** 2241720042<br>
**Kelas :** TI-3B<br>
**Absen :** 16

## 1. Persiapan Lingkungan
1. Inisialisasi proyek Next.js dengan menjalankan perintah berikut: Perhatikan bahwa App Router
belum digunakan 
<img src="img/1.jpg">
2. Jalankan aplikasi Next.js dengan perintah: 
<img src="img/2.jpg">

## 2. Membuat Halaman dengan Server-Side Rendering (SSR)

1. Buka file pages/index.tsx di text editor Anda.
2. Ganti kode di dalamnya dengan kode berikut untuk membuat halaman sederhana:  
```js
import React from 'react';

const HomePage = () => {
  return (
    <>
      <h1>Selamat Datang di Website Saya!</h1>
      <p>Ini adalah halaman utama.</p>
    </>
  );
};

export default HomePage;
```
3. Simpan file dan lihat perubahan di browser. Anda akan melihat halaman utama dengan teks
"Selamat Datang di Website Saya!". 

<img src="img/3.jpg">

## 3. Menggunakan Static Site Generation (SSG) 
1. Buat file baru di direktori pages dengan nama blog.js. 
2. Tambahkan kode berikut untuk membuat halaman blog dengan SSG: 
``` js
import React from 'react';

const Blog = ({ posts }) => {
  return (
    <div>
      <h1>Blog Saya</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
}

export default Blog;

```
3. Simpan file dan buka http://localhost:3000/blog di browser. Anda akan melihat daftar post yang
diambil dari API eksternal. 

<img src="img/4.jpg">

## 4. Menggunakan Dynamic Routes 
1. Buat direktori baru di pages dengan nama blog.
2. Buat file di dalam direktori blog dengan nama [slug].js
3. Tambahkan kode berikut untuk membuat halaman dinamis berdasarkan slug: 
```js
import { useRouter } from 'next/router';

const BlogPost = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <h1>Blog Post: {slug ? slug : 'Loading...'}</h1>
      <p>Ini adalah blog post dengan slug {slug ? slug : '...'}</p>
    </div>
  );
};

export default BlogPost;

```
4. Simpan file dan buka http://localhost:3000/blog/contoh-post di browser. Anda akan melihat
halaman yang menampilkan slug dari URL. 

<img src="img/5.jpg">

## 5. Menggunakan API Routes 
1. Pastikan terdapat direktori di pages dengan nama api.
2. Buat file di dalam direktori api dengan nama products.js.
3. Tambahkan kode berikut untuk membuat API route yang mengembalikan daftar produk: 
```js
export default async function handler(req, res) {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();

    res.status(200).json(products);
}
```
4. Buat file baru di pages dengan nama products.js untuk menampilkan daftar produk: 
```js
import { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products');
      const products = await response.json();
      setProducts(products);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Daftar Produk</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
};
export default ProductList;
```
5. Simpan file dan buka http://localhost:3000/products di browser. Anda akan melihat daftar
produk yang diambil dari API route. 

<img src="img/6.jpg">

## 6. Menggunakan Link Component 
1. Buka file pages/index.tsx dan tambahkan modif dengan kode berikut untuk membuat link ke
halaman lain: 
```js
import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1>Selamat Datang di Website Saya!</h1>
      <p>Ini adalah halaman utama.</p>
      <Link href="/about">
        <a>Tentang Kami</a>
      </Link>
    </div>
  );
};

export default HomePage;

```
2. Buat file baru di pages dengan nama about.js untuk halaman "Tentang Kami": 
```js
const AboutPage = () => {
  return (
    <div>
      <h1>Tentang Kami</h1>
      <p>Kami adalah perusahaan yang mengkhususkan diri dalam pembuatan website berkualitas tinggi.</p>
    </div>
  );
};

export default AboutPage;

```
3. Simpan file dan buka http://localhost:3000 di browser. Klik link "Tentang Kami" untuk navigasi ke
halaman tentang. 

<img src="img/7.jpg">
<br>
<img src="img/8.jpg">

## Tugas 
1. Buat halaman baru dengan menggunakan Static Site Generation (SSG) yang menampilkan daftar
pengguna dari API https://jsonplaceholder.typicode.com/users. 

<b>file: /pages/users/index.js </b>

```js
import Link from 'next/link';

export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();

  return {
    props: { users },
  };
}

const UsersPage = ({ users }) => {
  return (
    <div>
      <h1>Daftar Pengguna</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;

```
<img src="img/9.jpg">
<br>
2. Implementasikan Dynamic Routes untuk menampilkan detail pengguna berdasarkan ID.

<b> file: pages/users/[id].js </b>

```js
export async function getStaticPaths() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();

  const paths = users.map((user) => ({
    params: { id: user.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
  const user = await res.json();

  return {
    props: { user },
  };
}

const UserDetail = ({ user }) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Website: {user.website}</p>
      <p>Perusahaan: {user.company.name}</p>
    </div>
  );
};

export default UserDetail;

```
<img src="img/10.jpg">
<br>
3. Buat API route yang mengembalikan data cuaca dari API eksternal (misalnya, OpenWeatherMap)
dan tampilkan data tersebut di halaman front-end. 


<b>file: pages/api/weather.js </b>

```js
export default async function handler(req, res) {
  const API_KEY = '6883ba0c545207c1c17da4c3843c6fc4';
  const city = req.query.city || 'Malang'; 

  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
  const data = await response.json();

  if (response.ok) {
    res.status(200).json(data);
  } else {
    res.status(500).json({ error: data.message });
  }
}

```

<b>file: pages/weather.js </b>

```js
import { useState, useEffect } from 'react';

const WeatherPage = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Jakarta');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(`/api/weather?city=${city}`);
        const data = await res.json();
        
        if (res.ok) {
          setWeather(data);
          setError(null); 
        } else {
          setWeather(null);
          setError(data.error || 'Terjadi kesalahan');
        }
      } catch (err) {
        setWeather(null);
        setError('Gagal mengambil data cuaca');
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div>
      <h1>Informasi Cuaca</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Masukkan nama kota"
        style={{ color: 'black', backgroundColor: 'white', padding: '5px', fontSize: '16px' }}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && weather.main ? (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperatur: {weather.main.temp}°C</p>
          <p>Cuaca: {weather.weather[0].description}</p>
        </div>
      ) : (
        !error && <p>Memuat data cuaca...</p>
      )}
    </div>
  );
};

export default WeatherPage;

```

<img src="img/11.jpg">
<img src="img/12.jpg">
<img src="img/13.jpg">