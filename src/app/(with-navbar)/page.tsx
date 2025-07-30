import style from './page.module.css';
import GradientButton from '../../components/gradient-button';
import Image from 'next/image';
import { ReactNode } from 'react';

function LandingCard({
  heading,
  text,
  imgSrc,
  isImageFirst = false,
}: {
  heading: ReactNode;
  text: ReactNode;
  imgSrc: string;
  isImageFirst: boolean;
}) {
  return (
    <div className={style.cardContainer}>
      {isImageFirst && (
        <Image src={imgSrc} alt='logo_image' width={550} height={450} />
      )}
      <div className={style.cardTextWrapper}>
        <h2 className={style.cardHeading}>{heading}</h2>
        <p className={style.cardText}>{text}</p>
      </div>

      {!isImageFirst && (
        <Image src={imgSrc} alt='logo_image' width={550} height={450} />
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <section className={style.headSection}>
        <div className={style.sectionHeadingWrapper}>
          <h1 className={style.sectionHeading}>
            <span className={style.gradientText}>세상의 모든 정보</span>를
            <br /> 쉽게 저장하고 관리해 보세요
          </h1>
        </div>

        <GradientButton href='/links' className='button_lg'>
          링크 추가하기
        </GradientButton>

        <Image
          src='/landing/image1.png'
          alt='logo_image'
          width={1118}
          height={570}
        />
      </section>

      <section className={style.mainSection}>
        <LandingCard
          heading={
            <>
              <span className={style.gradientText}>원하는 링크</span>
              를<br />
              저장하세요
            </>
          }
          text={
            <>
              나중에 읽고 싶은 글, 다시 보고 싶은 영상,
              <br /> 사고 싶은 옷, 기억하고 싶은 모든 것을
              <br /> 한 공간에 저장하세요.
            </>
          }
          imgSrc='/landing/image2.png'
          isImageFirst={false}
        />
        <LandingCard
          heading={
            <>
              링크를 폴더로
              <br />
              <span className={style.gradientText}>관리</span>하세요
            </>
          }
          text={
            <>
              나만의 폴더를 무제한으로 만들고
              <br />
              다양하게 활용할 수 있습니다.
            </>
          }
          imgSrc='/landing/image3.png'
          isImageFirst={true}
        />
        <LandingCard
          heading={
            <>
              저장한 링크를
              <br />
              <span className={style.gradientText}>공유</span>해 보세요.
            </>
          }
          text={
            <>
              여러 링크를 폴더에 담고 공유할 수 있습니다.
              <br /> 가족, 친구, 동료들에게 쉽고 빠르게 링크를 <br />
              공유해 보세요.
            </>
          }
          imgSrc='/landing/image4.png'
          isImageFirst={false}
        />
        <LandingCard
          heading={
            <>
              저장한 링크를
              <br />
              <span className={style.gradientText}>검색</span>해 보세요
            </>
          }
          text={<>중요한 정보들을 검색으로 쉽게 찾아보세요.</>}
          imgSrc='/landing/image5.png'
          isImageFirst={true}
        />
      </section>
    </div>
  );
}
