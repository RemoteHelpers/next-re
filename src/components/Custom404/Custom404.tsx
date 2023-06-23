import { FC } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Custom404.module.scss';
import type { INavUrlState, INotFoundData } from '@/shared/types';
import { PhotoAPI } from '@/constants';

type Props = { notFoundProps: INotFoundData & INavUrlState };
const Custom404: FC<Props> = ({ notFoundProps }) => {
  if (!notFoundProps) return <></>;
  const { locale } = useRouter();
  const { setNavURL } = notFoundProps;

  return (
    <section className={styles.container}>
      <main className={styles.main_wrapper}>
        <div className={styles.main_info}>
          <h1>404</h1>
          <h3>{notFoundProps?.title}</h3>
          <p>{notFoundProps?.subTitle}</p>
          <div className={styles.main_info_btns}>
            <Link href={'/'} onClick={() => setNavURL('/')}>
              {notFoundProps?.link1}
            </Link>
            <Link href={`${locale}/vacancies`} onClick={() => setNavURL(`${locale}/vacancies`)}>
              {notFoundProps?.link2}
            </Link>
          </div>
        </div>
        <Image
          className={styles.main_image}
          src={PhotoAPI + notFoundProps?.notFoundCat?.data[0]?.attributes.url}
          width={535}
          height={460}
          quality={100}
          alt={'Not-found page cat :('}
        />
      </main>
    </section>
  );
};

export default Custom404;
