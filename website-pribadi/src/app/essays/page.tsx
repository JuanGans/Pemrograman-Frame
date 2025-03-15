import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Esai',
  description: 'Kumpulan esai yang telah saya tulis.',
  openGraph: {
    title: 'Esai',
    description: 'Kumpulan esai yang telah saya tulis.',
  },
};

type EssayProps = {
  title: string;
  date: string;
  link: string;
};

const essays: EssayProps[] = [
  { title: "Artikel 1 ", date: "10 Maret 2025", link: "#" },
  { title: "Artikel 2", date: "5 Maret 2025", link: "#" },
  { title: "Artikel 3", date: "20 Februari 2025", link: "#" },
  { title: "Artikel 4", date: "10 Februari 2025", link: "#" },
];

function EssayItem({ title, date, link }: EssayProps) {
  return (
    <a href={link} className="block p-6 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition">
      <h2 className="text-xl font-semibold text-zinc-800">{title}</h2>
      <p className="text-sm text-zinc-500 mt-2">{date}</p>
    </a>
  );
}

export default function Essays() {
  return (
    <div className="mt-16 px-8">
      <header className="mb-8">
        <h1 className="font-bold text-4xl text-zinc-800">Esai Saya</h1>
        <p className="text-zinc-600 mt-2">Berikut adalah beberapa esai yang telah saya tulis.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {essays.map((essay, index) => (
          <EssayItem key={index} {...essay} />
        ))}
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

// export default function Essays() {
//   return (
//     <div className="mt-16 px-8">
//       <header>
//         <h1 className="font-bold text-4xl text-zinc-800">Tentang Saya</h1>
//       </header>
//     </div>
//   );
// }


// // export default function Essays(){
// //     return <div>Esai</div>
// // }