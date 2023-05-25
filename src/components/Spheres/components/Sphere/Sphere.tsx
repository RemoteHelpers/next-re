import Link from 'next/link';
import { FC, useContext } from 'react';
import s from './Sphere.module.scss';
import { CategoryIcon } from '@/shared/components/IconComponents/CategoryIcon';
import { GlobalContext } from '@/context';

type SphereProps = {
  categorySlug: string;
  categoryTitle: string;
};

export const Sphere: FC<SphereProps> = ({ categorySlug, categoryTitle }) => {
  const { setNavURL } = useContext(GlobalContext);

  return (
    <Link href={`/${categorySlug}`} onClick={() => setNavURL(categorySlug)} className={s.sphere}>
      <CategoryIcon id={categorySlug} />
      <h5 className={s.title}>{categoryTitle}</h5>
    </Link>
  );
};
