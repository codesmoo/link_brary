import Link from 'next/link';
import style from './page.module.css';
import Image from 'next/image';
import Button from '@/components/gradient-button';

export default function Page() {
  return (
    <div className={style.container}>
      <Link href='/'>
        <Image src='/logo.png' alt='logo_image' width={210} height={38} />
      </Link>
      <p className={style.signupText}>
        회원이 아니신가요?{' '}
        <Link href='/signup' className={style.signupLink}>
          회원 가입하기
        </Link>
      </p>
      <form className={style.form}>
        <label htmlFor='email' className={style.formLabel}>
          이메일
        </label>
        <input
          type='email'
          id='email'
          placeholder='codeit@codeit.com'
          className={style.formInput}
        />

        <label htmlFor='password' className={style.formLabel}>
          비밀번호
        </label>
        <div className={style.passwordWrapper}>
          <input type='password' id='password' className={style.formInput} />
          <span className={style.toggle}>
            <Image
              className={style.toggleImg}
              src='/eyeoff.png'
              alt='eyeoff_image'
              width={16}
              height={14}
            />
          </span>
        </div>

        <Button href='/login' className='button_lg'>
          로그인
        </Button>
      </form>
    </div>
  );
}
