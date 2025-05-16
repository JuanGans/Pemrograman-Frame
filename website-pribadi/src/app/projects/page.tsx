import type { Metadata } from 'next';
import Image, {StaticImageData} from 'next/image';
import image1 from '../../../public/images/project1.png';
import image2 from '../../../public/images/project2.png';



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
};
type projectItemProps = {
  name : string;
  url : string;
  urlDisplay : string;
  imageSrc : StaticImageData;
};

function ProjectItem({name,url,urlDisplay,imageSrc}:projectItemProps){
  return (
    <li>
      <a href={url}>
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg">
          <Image className="w-full" src={imageSrc} alt={name} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{name}</div>
          </div>
          <div className="px-6 pb-4">
            <span className="inline-block bg gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {urlDisplay}</span>
          </div>
        </div>
      </a>
    </li>
  );
}

export default function Projects() {
  return (
    <div className="mt-16 px-8">
      <header>
        <h1 className="font-bold text-4xl text-zinc-800">Proyek Saya</h1>
        <p className="text-base mt-6 text-zinc-600">
          Berikut adalah beberapa proyek yang telah saya kerjakan.
        </p>
      </header>

      <div className="mt-16">
        <h2 className="text-2xl">Aplikasi</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 mt-8">
          <ProjectItem
            name="Aplikasi 1"
            url="https://i.ibb.co.com/XksNtcFY/project1.jpg"
            urlDisplay="Perpustakaan Online"
            imageSrc={image1}
          />
          <ProjectItem
            name="Aplikasi 2"
            url="https://i.ibb.co.com/7ssK9gc/project2.jpg"
            urlDisplay="Looksy"
            imageSrc={image2}
          />
        </ul>
      </div>
    </div>
  );
}


// export default function Projects() {
//   return (
//     <div className="mt-16 px-8">
//       <header>
//         <h1 className="font-bold text-4xl text-zinc-800">Tentang Saya</h1>
//       </header>
//     </div>
//   );
// }


// export default function Projects(){
//     return <div>Proyek</div>
// }