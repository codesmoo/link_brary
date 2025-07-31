import style from './page.module.css';
import GradientButton from '../../../components/gradient-button';
import OutlinedButton from '../../../components/outlined-button';
import Image from 'next/image';
import Link from 'next/link';

function Card() {
  return (
    <div className={style.cardWrapper}>
      <Image
        src='/car.jpg'
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
          10 minutes ago
          <Image src='/kebab.png' alt='kebab_image' width={21} height={17} />
        </p>
        <p className={style.cardDescription}>
          Lorem ipsum dolor sit amet consectetur. Metus amet habitant nunc
          consequat. Tldkd
        </p>
        <p className={style.cardCreatedAt}>2023. 3. 15</p>
      </div>
    </div>
  );
}

export default function Page() {
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
            <OutlinedButton href='/links' className='button_sm'>
              유튜브
            </OutlinedButton>
            <OutlinedButton href='/links' className='button_sm'>
              코딩 팁
            </OutlinedButton>
            <OutlinedButton href='/links' className='button_sm'>
              채용 사이트
            </OutlinedButton>
            <OutlinedButton href='/links' className='button_sm'>
              유용한 글
            </OutlinedButton>
          </div>
          <Link href='/' className={style.link}>
            폴더 추가{' '}
            <Image src='/add.png' alt='add_image' width={16} height={16} />
          </Link>
        </div>

        <div className={style.folderHeading}>
          <h2 className={style.folderName}>유용한글</h2>
          <div className={style.folderButtons}>
            <Link href='/' className={style.folderButton}>
              <Image src='/share.png' alt='add_image' width={18} height={18} />
              공유
            </Link>
            <Link href='/' className={style.folderButton}>
              <Image src='/pen.png' alt='add_image' width={18} height={18} />
              이름 변경
            </Link>
            <Link href='/' className={style.folderButton}>
              <Image src='/delete.png' alt='add_image' width={18} height={18} />
              삭제
            </Link>
          </div>
        </div>
        <div className={style.cardGrid}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
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
