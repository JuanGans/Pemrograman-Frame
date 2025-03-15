import type { Metadata } from 'next';
import Image from 'next/image';
import profilePic from '../../public/images/profile.jpg';

export const metadata: Metadata = {
  title: 'Tentang Saya',
  description: 'Halaman tentang saya.',
  openGraph: {
    title: 'Tentang Saya',
    description: 'Halaman tentang saya.',
  },
};

export default function About() {
  return (
    <div className="mt-16 px-8 max-w-4xl mx-auto">
      <header className="text-center">
        <h1 className="font-bold text-4xl text-zinc-800">Tentang Saya</h1>
        <p className="text-zinc-600 mt-2">Front End Developer</p>
      </header>

      <div className="mt-10 flex flex-col md:flex-row items-center gap-8">
        {/* Foto Profil */}
        <div className="w-40 h-40 md:w-52 md:h-52 relative rounded-full overflow-hidden border-4 border-teal-500 shadow-lg">
          <Image src={profilePic} alt="Foto Profil" layout="fill" objectFit="cover" />
        </div>

        {/* Deskripsi Diri */}
        <div className="text-center md:text-left">
          <p className="text-lg text-zinc-700">
            Halo! Saya <span className="font-semibold">Juan</span>, seorang <span className="text-teal-500">Front End Developer</span> yang memiliki ketertarikan dalam pengembangan aplikasi berbasis web.
          </p>
          <p className="mt-4 text-zinc-600">
            Saya memiliki pengalaman dalam mengembangkan aplikasi berbasis Laravel, Next.js, untuk berbagai proyek, termasuk sistem perpustakaan dan management keuangan dan reservasi lapangan sport center.
          </p>

          {/* Ikon Sosial Media */}
          <div className="mt-6 flex justify-center md:justify-start gap-4">
            <a href="#" className="text-zinc-600 hover:text-teal-500 transition">
            🅾 Instagram
            </a>
            <a href="https://github.com/JuanGans/" className="text-zinc-600 hover:text-teal-500 transition">
              🐙 GitHub
            </a>
            <a href="mailto:juantkj01@gmail.com" className="text-zinc-600 hover:text-teal-500 transition">
              📧 Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}













// import type { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Tentang Saya',
//   description: 'Halaman tentang saya.',
//   openGraph: {
//     title: 'Tentang Saya',
//     description: 'Halaman tentang saya.',
//   },
// };

// export default function Home() {
//   return (
//     <div className="mt-16 px-8">
//       <header>
//         <h1 className="font-bold text-4xl text-zinc-800">Tentang Saya</h1>
//       </header>
//     </div>
//   );
// }

// // import Image from "next/image";

// // export default function Home() {
// //   return (
// //     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
// //       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
// //         <Image
// //           className="dark:invert"
// //           src="/next.svg"
// //           alt="Next.js logo"
// //           width={180}
// //           height={38}
// //           priority
// //         />
// //         <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
// //           <li className="mb-2">
// //             Get started by editing{" "}
// //             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
// //               src/app/page.tsx
// //             </code>
// //             .
// //           </li>
// //           <li>Save and see your changes instantly.</li>
// //         </ol>

// //         <div className="flex gap-4 items-center flex-col sm:flex-row">
// //           <a
// //             className="r ounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
// //             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             <Image
// //               className="dark:invert"
// //               src="/vercel.svg"
// //               alt="Vercel logomark"
// //               width={20}
// //               height={20}
// //             />
// //             Deploy now
// //           </a>
// //           <a
// //             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
// //             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             Read our docs
// //           </a>
// //         </div>
// //       </main>
// //       <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
// //         <a
// //           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
// //           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           <Image
// //             aria-hidden
// //             src="/file.svg"
// //             alt="File icon"
// //             width={16}
// //             height={16}
// //           />
// //           Learn
// //         </a>
// //         <a
// //           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
// //           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           <Image
// //             aria-hidden
// //             src="/window.svg"
// //             alt="Window icon"
// //             width={16}
// //             height={16}
// //           />
// //           Examples
// //         </a>
// //         <a
// //           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
// //           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           <Image
// //             aria-hidden
// //             src="/globe.svg"
// //             alt="Globe icon"
// //             width={16}
// //             height={16}
// //           />
// //           Go to nextjs.org →
// //         </a>
// //       </footer>
// //     </div>
// //   );
// // }
