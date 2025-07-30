import { ReactNode } from 'react';
import style from './layout.module.css';

export default function Layout({ children }: { children: ReactNode }) {
  return <div className={style.container}>{children}</div>;
}
