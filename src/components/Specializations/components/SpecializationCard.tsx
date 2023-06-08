import { FC, useContext } from 'react';
import Link from 'next/link';
import type { ICategoryAttributes } from '@/shared/types/CategoriesTypes';
import s from './SpecializationCard.module.scss';
import { SpecializationsIcon } from '@/shared/components/IconComponents/Specializations';
import { GlobalContext } from '@/context';

type Props = {
  category: ICategoryAttributes;
  linkText: string;
};

export const SpecializationCard: FC<Props> = ({ category, linkText }) => {
  const { categorySlug, categoryTitle, shortDescription } = category;
  const { setIsLoading } = useContext(GlobalContext);
  const showLoader = () => setIsLoading(true);
  const descrPlug =
    'Мы работаем по шести основным направлениям, которые включают много специальностей. Мы работаем по шести основным направлениям, которые включают много специальностей.';

  return (
    <>
      <SpecializationsIcon name={categorySlug} />
      <h3 className={s.title}>{categoryTitle}</h3>
      <p className={s.description}>{shortDescription || descrPlug}</p>
      <Link href={`/${categorySlug}`} className={s.link} onClick={showLoader}>
        <span>{linkText}</span>
        <SpecializationsIcon name="arrow-more" />
      </Link>
    </>
  );
};
