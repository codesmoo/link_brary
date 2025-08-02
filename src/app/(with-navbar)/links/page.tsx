'use client';

import style from './page.module.css';
import GradientButton from '@/components/gradient-button';
import OutlinedButton from '@/components/outlined-button';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import Card from '@/components/card';
import { useRouter } from 'next/navigation';
import { FolderData, LinkData } from '@/types';

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();
  const [folders, setFolders] = useState<FolderData[]>([]);
  const [links, setLinks] = useState<LinkData[]>([]);
  const [currentFolder, setCurrentFolder] = useState<FolderData | null>(null);

  async function getMyFolders() {
    const res = await axios.get('/folders');
    const data = res.data;
    setFolders(data);

    // setCurrentFolder(data[0]);
  }

  async function getMyLinks() {
    const res = await axios.get('/links');
    const data = res.data;
    setLinks(data.list);
  }

  useEffect(() => {
    getMyFolders();
    getMyLinks();
  }, []);

  if (!user) {
    router.push('/');
    return null;
  }
  return (
    <div className={style.container}>
      <section className={style.inputSection}>
        <div className={style.inputWrapper}>
          <span className={style.inputIcon}>
            <Image src='/link.png' alt='link_image' width={20} height={20} />
          </span>

          <input
            type='text'
            placeholder='링크를 추가해 보세요'
            className={style.inputField}
          />
          <span className={style.inputButton}>
            <GradientButton href='/login' className='button_sm'>
              추가하기
            </GradientButton>
          </span>
        </div>
      </section>
      <section className={style.infoSection}>
        <div className={style.favoriteHeading}>
          <div className={style.favoriteButtons}>
            <OutlinedButton href='/links' className='button_sm'>
              전체
            </OutlinedButton>
            {folders.map((folder) => (
              <OutlinedButton
                key={folder.id}
                href='/links'
                className='button_sm'
              >
                {folder.name}
              </OutlinedButton>
            ))}
          </div>
          <Link href='/' className={style.link}>
            폴더 추가{' '}
            <Image src='/add.png' alt='add_image' width={16} height={16} />
          </Link>
        </div>

        <div className={style.folderHeading}>
          {currentFolder ? (
            <>
              <h2 className={style.folderName}>{currentFolder.name}</h2>
              <div className={style.folderButtons}>
                <Link href='/' className={style.folderButton}>
                  <Image
                    src='/share.png'
                    alt='add_image'
                    width={18}
                    height={18}
                  />
                  공유
                </Link>
                <Link href='/' className={style.folderButton}>
                  <Image
                    src='/pen.png'
                    alt='add_image'
                    width={18}
                    height={18}
                  />
                  이름 변경
                </Link>
                <Link href='/' className={style.folderButton}>
                  <Image
                    src='/delete.png'
                    alt='add_image'
                    width={18}
                    height={18}
                  />
                  삭제
                </Link>
              </div>
            </>
          ) : (
            <h2 className={style.folderName}>전체</h2>
          )}
        </div>
        <div className={style.cardGrid}>
          {links.map((link) => (
            <Card key={link.id} {...link} />
          ))}
        </div>
        <div className={style.pageButtons}>
          <div>{'<'}</div>
          <div>{'1'}</div>
          <div>{'>'}</div>
        </div>
      </section>
    </div>
  );
}
