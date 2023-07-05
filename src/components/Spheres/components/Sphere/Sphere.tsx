import { FC } from 'react';
import Link from 'next/link';
import { INavUrlState } from '@/shared/types';
import s from './Sphere.module.scss';
import { CategoryIcon } from '@/shared/components/IconComponents/CategoryIcon';

type SphereProps = {
  categorySlug: string;
  categoryTitle: string;
  navUrlState: INavUrlState;
};

export const Sphere: FC<SphereProps> = ({
  categorySlug,
  categoryTitle,
  navUrlState: { setNavURL },
}) => {
  return (
    <Link href={`/${categorySlug}`} onClick={() => setNavURL(categorySlug)} className={s.sphere}>
      <CategoryIcon id={categorySlug} />
      <h5 className={s.title}>{categoryTitle}</h5>
    </Link>
  );
};
