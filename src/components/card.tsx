import Image from 'next/image';
import style from './card.module.css';
import { LinkData } from '@/types';

export default function Card({
  id,
  favorite,
  url,
  title,
  imageSource,
  description,
  createdAt,
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
        <p className={style.cardTitle}>
          {title}
          <Image src='/kebab.png' alt='kebab_image' width={21} height={17} />
        </p>
        <p className={style.cardDescription}>{description}</p>
        <p className={style.cardCreatedAt}>{createdAt}</p>
      </div>
    </div>
  );
}
