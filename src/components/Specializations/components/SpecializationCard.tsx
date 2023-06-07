import { FC, useContext } from 'react';
import Link from 'next/link';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import type { ICategoryAttributes } from '@/shared/types/CategoriesTypes';
import s from './SpecializationCard.module.scss';
import { SpecializationsIcon } from '@/shared/components/IconComponents/Specializations';
import { GlobalContext } from '@/context';

type Props = {
  category: ICategoryAttributes;
};

export const SpecializationCard: FC<Props> = ({ category }) => {
  const { categorySlug, categoryTitle, description } = category;
  const { setIsLoading } = useContext(GlobalContext);
  const showLoader = () => setIsLoading(true);

  return (
    <>
      <SpecializationsIcon name={categorySlug} />
      <h3 className={s.title}>{categoryTitle}</h3>
      <p className={s.description}>{description}</p>
      {/* <ReactMarkdown children={description} /> */}
      <Link href={`/${categorySlug}`} className={s.link} onClick={showLoader}>
        <span>{`Дізнатися більше`}</span>
        <SpecializationsIcon name="arrow-more" />
      </Link>
    </>
  );
};
