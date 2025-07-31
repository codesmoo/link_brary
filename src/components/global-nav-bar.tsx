import Link from 'next/link';
import style from './global-nav-bar.module.css';
import Image from 'next/image';
import GradientButton from './gradient-button';
import OutlinedButton from './outlined-button';

export function GlobalNavBar() {
  const user_bool = 0;
  return (
    <header>
      <div className={style.container}>
        <Link href='/' className={style.logo_link}>
          <Image src='/logo.png' alt='logo_image' width={133} height={24} />
        </Link>
        {user_bool ? (
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
