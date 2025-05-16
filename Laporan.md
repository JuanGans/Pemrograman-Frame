# Week 05 - Membuat Halaman yang SEO-Friendly dengan Next.js

**Nama :** Juan Felix Antonio Nathan Tote<br>
**NIM :** 2241720042<br>
**Kelas :** TI-3C<br>
**Absen :** 16

## 1. Langkah-langkah Praktikum 
1. Menambahkan Favicon 
 - Siapkan file favicon (format .ico) dan letakkan di folder - public/. 
 - Hapus faveicon.ico yang ada di folder src/app 
 - Update file src/components/layout.tsx untuk menambahkan favicon:
 ```tsx
export default function Layout({ children }: LayoutProps) {
    return (
    <>
    <Head>
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <Navbar />
    <main>{children}</main>
    <Footer />
    </>
    );
}
 ```

 2. Simpan dan jalankan proyek. Favicon akan muncul di tab browser. 
<img src="img/1.jpg">

## 2. Menambahkan Metadata untuk SEO 
1. Buat file src/utils/metadata.ts untuk menyimpan metadata default: 
```tsx
export const defaultMetadata = {
    title: "Website Pribadi",
    description: "Website pribadi untuk menampilkan proyek dan esai.",
    openGraph: {
      images: "https://i.pinimg.com/originals/fb/84/f8/fb84f87ea6a881abcd23e24409831df7.gif",
      url: "http://localhost:3000/"
    },
  };
  
```
2. Update file src/components/layout.tsx untuk menggunakan metadata default jika tidak ada metadata yang di-pass:
```tsx
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import { defaultMetadata } from '../utils/metadata';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const metadata = (children as any)?.props?.metadata || defaultMetadata;

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Open Graph Tags */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.openGraph?.images} />
        <meta property="og:url" content={metadata.openGraph?.url} />
      </Head>

      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

```

3. Update Setiap Halaman untuk dapat mem-pass definisi metadata 
Contoh Halaman “Tentang Saya” 
```tsx
import { defaultMetadata } from '../utils/metadata';


export const metadata: Metadata = {
  title: 'Tentang Saya',
  description: 'Halaman tentang saya.',
  openGraph: {
    images: [
      {
        url: "https://i.pinimg.com/originals/fb/84/f8/fb84f87ea6a881abcd23e24409831df7.gif",
      },
    ],
    url: "http://localhost:3000/",
  },
};
```

4. Lanjutkan untuk halaman Proyek dan Esai 
Proyek:
```tsx
export const metadata: Metadata = {
  title: 'Proyek',
  description: 'Halaman Proyek.',
  openGraph: {
    images: [
      {
        url: "https://i.pinimg.com/originals/fb/84/f8/fb84f87ea6a881abcd23e24409831df7.gif",
      },
    ],
    url: "http://localhost:3000/",
  },
}
```
Esai:
```tsx
export const metadata: Metadata = {
  title: 'Esai',
  description: 'Kumpulan esai yang telah saya tulis.',
  openGraph: {
    title: 'Esai',
    description: 'Kumpulan esai yang telah saya tulis.',
    images: [
      {
        url: "https://i.pinimg.com/originals/fb/84/f8/fb84f87ea6a881abcd23e24409831df7.gif",
      },
    ],
    url: "http://localhost:3000/",
  },
};
```

## 4. Open Graph Tags untuk Media Sosial 
Open Graph Tags digunakan untuk mengontrol bagaimana konten Anda ditampilkan saat dibagikan di
media sosial seperti Facebook dan Twitter. 
Langkah-langkah:
1. Pastikan Anda telah menambahkan Open Graph Tags di layout.tsx seperti yang telah dijelaskan
sebelumnya.
2. Update metadata di setiap halaman untuk menyertakan Open Graph Tags. 
```tsx
// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Website Pribadi',
  description: 'Website pribadi untuk menampilkan proyek dan esai.',
  openGraph: {
    title: 'Website Pribadi',
    description: 'Website pribadi untuk menampilkan proyek dan esai.',
    url: 'http://localhost:3000/',
    images: [
      {
        url: 'https://i.pinimg.com/originals/fb/84/f8/fb84f87ea6a881abcd23e24409831df7.gif',
        width: 800,
        height: 600,
        alt: 'Website Pribadi',
      },
    ],
    siteName: 'Website Pribadi',
    type: 'website',
  },
}
```

## 5. Menguji SEO 
1. Setelah menambahkan metadata, favicon, dan Open Graph Tags, Anda dapat menguji SEO dengan Membuka halaman di browser dan memeriksa elemen HTML menggunakan Developer Tools (Ctrl + Shift + I atau F12). 
<img src="img/2.jpg">