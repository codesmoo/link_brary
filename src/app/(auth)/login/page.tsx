'use client';

import Link from 'next/link';
import style from './page.module.css';
import Image from 'next/image';
import Button from '@/components/gradient-button';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const { login } = useAuth();
  const router = useRouter();

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = values;
    await login({ email, password });

    router.push('/links');
  };

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
      <form className={style.form} onSubmit={handleSubmit}>
        <label htmlFor='email' className={style.formLabel}>
          이메일
        </label>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='codeit@codeit.com'
          className={style.formInput}
          value={values.email}
          onChange={handleChange}
        />

        <label htmlFor='password' className={style.formLabel}>
          비밀번호
        </label>
        <div className={style.passwordWrapper}>
          <input
            type='password'
            id='password'
            name='password'
            className={style.formInput}
            value={values.password}
            onChange={handleChange}
          />
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

        <Button type='submit' className='button_lg'>
          로그인
        </Button>
      </form>
    </div>
  );
}
