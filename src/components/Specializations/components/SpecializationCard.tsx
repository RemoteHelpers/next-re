import { FC } from 'react';
import Link from 'next/link';
import type { IAboutData, ICategoryAttributes, INavUrlState } from '@/shared/types';
import s from './SpecializationCard.module.scss';
import { SpecializationsIcon } from '@/shared/components/IconComponents/Specializations';

type Props = { category: ICategoryAttributes; about: IAboutData; navUrlState: INavUrlState };
export const SpecializationCard: FC<Props> = ({ category, about, navUrlState: { setNavURL } }) => {
  const { categorySlug, categoryTitle, shortDescription } = category;

  return (
    <>
      <SpecializationsIcon name={categorySlug} />
      <h3 className={s.title}>{categoryTitle}</h3>
      <p className={s.description}>{shortDescription || about.SecondDescription}</p>
      <Link href={`/${categorySlug}`} className={s.link} onClick={() => setNavURL(categorySlug)}>
        <span>{about.learnMoreText}</span>
        <SpecializationsIcon name="arrow-more" />
      </Link>
    </>
  );
};
