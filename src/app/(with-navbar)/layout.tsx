import Link from 'next/link';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header>
        <Link href={'/'}>Linkbrary</Link>
      </header>
      <main>{children}</main>
      <footer>@codeit</footer>
    </div>
  );
}
