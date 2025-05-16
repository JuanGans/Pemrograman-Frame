'use client';

import { usePathname } from 'next/navigation';

type NavItemProps = {
    title: string;
    url: string;
    isSelected: boolean;
};

function NavItem({ title, url, isSelected }: NavItemProps) {
  return (
    <li>
      <a
        href={url}
        className={`block px-3 py-2 transition hover:text-teal-500 ${
          isSelected ? 'text-teal-500' : ''
        }`}
      >
        {title}
      </a>
    </li>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="flex justify-center mx-auto max-w-7xl h-16 pt-6">
      <nav>
        <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur">
          <NavItem title="Tentang Saya" url="/" isSelected={pathname === '/'} />
          <NavItem title="Proyek" url="/projects" isSelected={pathname === '/projects'} />
          <NavItem title="Esai" url="/essays" isSelected={pathname === '/essays'} />
        </ul>
      </nav>
    </div>
  );
}
