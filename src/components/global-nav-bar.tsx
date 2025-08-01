'use client';

import Link from 'next/link';
import style from './global-nav-bar.module.css';
import Image from 'next/image';
import GradientButton from './gradient-button';
import OutlinedButton from './outlined-button';

import { useAuth } from '@/context/AuthContext';

export function GlobalNavBar() {
  const { isAuthenticated, logout } = useAuth();

  const user_bool = 1;
  return (
    <header>
      <div className={style.container}>
        <Link href='/' className={style.logo_link}>
          <Image src='/logo.png' alt='logo_image' width={133} height={24} />
        </Link>
        {!isAuthenticated ? (
          <GradientButton href='/login' className='button_mid'>
            로그인
          </GradientButton>
        ) : (
          <div className={style.profile_wrapper}>
            <OutlinedButton href='/links' className='button_lg'>
              ⭐️ 즐겨찾기
            </OutlinedButton>
            <div className={style.profile}>
              <Image
                src='/profile.png'
                alt='logo_image'
                width={28}
                height={28}
              />
              <div>유저명</div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
