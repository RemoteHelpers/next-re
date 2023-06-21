import { FC, useContext } from 'react';
import Link from 'next/link';
import type { ICategoryAttributes } from '@/shared/types/CategoriesTypes';
import type { IAboutData } from '@/shared/types/AboutTypes';
import s from './SpecializationCard.module.scss';
import { SpecializationsIcon } from '@/shared/components/IconComponents/Specializations';
import { GlobalContext } from '@/context';

type Props = {
  category: ICategoryAttributes;
  about: IAboutData;
};

export const SpecializationCard: FC<Props> = ({ category, about }) => {
  const { categorySlug, categoryTitle, shortDescription } = category;
  const { setIsLoading } = useContext(GlobalContext);
  const showLoader = () => setIsLoading(true);

  return (
    <>
      <SpecializationsIcon name={categorySlug} />
      <h3 className={s.title}>{categoryTitle}</h3>
      <p className={s.description}>{shortDescription || about.SecondDescription}</p>
      <Link href={`/${categorySlug}`} className={s.link} onClick={showLoader}>
        <span>{about.learnMoreText}</span>
        <SpecializationsIcon name="arrow-more" />
      </Link>
    </>
  );
};
