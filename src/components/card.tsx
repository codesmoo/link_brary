'use client';

import Image from 'next/image';
import style from './card.module.css';
import { LinkData } from '@/types';
import DropdownMenu from './dropdown-menu';
import axios from '@/lib/axios';

export default function Card({
  id,
  favorite,
  url,
  title,
  imageSource,
  description,
  createdAt,
  onDelete,
  onUpdate,
}: LinkData) {
  return (
    <div className={style.cardWrapper}>
      <Image
        src={imageSource?.includes('https') ? imageSource : '/noImgWord.png'}
        alt='car_image'
        width={340}
        height={200}
        style={{ objectFit: 'cover' }}
      />
      <span className={style.favoriteStar}>
        <Image
          src='/favoriteStar.png'
          alt='favoriteStar_image'
          width={34}
          height={34}
        />
      </span>

      <div className={style.cardInfo}>
        <div className={style.cardTitle}>
          {title}
          <DropdownMenu onDelete={onDelete} onUpdate={onUpdate} />
        </div>

        <p className={style.cardDescription}>{description}</p>
        <p className={style.cardCreatedAt}>{createdAt}</p>
      </div>
    </div>
  );
}
