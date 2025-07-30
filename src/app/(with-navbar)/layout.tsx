import { GlobalNavBar } from '@/components/global-nav-bar';
import { ReactNode } from 'react';
import style from './layout.module.css';
import Link from 'next/link';
import Image from 'next/image';

function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.companyText}>@codeit - 2025</div>
      <div className={style.linkWrapper}>
        <Link href='/privacy' className={style.link}>
          Privacy policy
        </Link>
        <Link href='/faq' className={style.link}>
          FAQ
        </Link>
      </div>
      <div className={style.snsLink}>
        <Image
          src='/sns/facebook.png'
          alt='logo_image'
          width={20}
          height={20}
        />
        <Image src='/sns/twitter.png' alt='logo_image' width={20} height={20} />
        <Image src='/sns/youtube.png' alt='logo_image' width={20} height={20} />
        <Image
          src='/sns/instagram.png'
          alt='logo_image'
          width={20}
          height={20}
        />
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={style.container}>
      <GlobalNavBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
