'use client';

import Link from 'next/link';
import style from './page.module.css';
import Image from 'next/image';
import Button from '@/components/gradient-button';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    passwordRepeat: '',
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

  async function handleSubmit(e) {
    e.preventDefault();

    if (values.password !== values.passwordRepeat) {
      //패스워드 틀렸다고 알려줘야함
      return;
    }
    const { name, email, password } = values;

    await axios.post('/auth/sign-up', {
      name,
      email,
      password,
    });
    await login({ email, password });
    router.push('/links');
  }

  return (
    <div className={style.container}>
      <Link href='/'>
        <Image src='/logo.png' alt='logo_image' width={210} height={38} />
      </Link>
      <p className={style.signupText}>
        이미 회원이신가요?{' '}
        <Link href='/login' className={style.signupLink}>
          로그인 하기
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
          onChange={handleChange}
        />

        <label htmlFor='name' className={style.formLabel}>
          이름
        </label>
        <input
          type='text'
          id='name'
          name='name'
          placeholder='홍길동'
          className={style.formInput}
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
            onChange={handleChange}
          />
          <span className={style.toggle}>
            <Image
              className={style.toggleImg}
              src='/eyeon.png'
              alt='eyeoff_image'
              width={16}
              height={11}
            />
          </span>
        </div>

        <label htmlFor='passwordRepeat' className={style.formLabel}>
          비밀번호 확인
        </label>
        <div className={style.passwordWrapper}>
          <input
            type='password'
            id='passwordRepeat'
            name='passwordRepeat'
            className={style.formInput}
            onChange={handleChange}
          />
          <span className={style.toggle}>
            <Image
              className={style.toggleImg}
              src='/eyeon.png'
              alt='visible_image'
              width={16}
              height={11}
            />
          </span>
        </div>

        <Button type='submit' className='button_lg'>
          회원가입
        </Button>
      </form>
    </div>
  );
}
