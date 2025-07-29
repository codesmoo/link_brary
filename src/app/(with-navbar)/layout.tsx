import { GlobalNavBar } from '@/components/global-nav-bar';
import { ReactNode } from 'react';
import style from './layout.module.css';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <body>
      <div className={style.container}>
        <GlobalNavBar />
        <main>{children}</main>
        <footer>@codeit</footer>
      </div>
    </body>
  );
}
