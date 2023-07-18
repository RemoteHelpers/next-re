import { FC, useMemo, RefObject } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import Link from 'next/link';
import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import type { ICategory, IHeader } from '@/shared/types';
import s from './CategoryMainBlock.module.scss';
import { Breadcrumbs } from '@/shared/components/Breadcrumbs';

type Props = { category: ICategory; header: IHeader; formRef: RefObject<HTMLDivElement> };
export const CategoryMainBlock: FC<Props> = ({ category, header, formRef }) => {
  const { categoryTitle, description } = category.attributes;
  const { menu, categoryButton } = header;

  const breadcrumbsItems = useMemo((): ItemType[] => {
    if (!menu) return [];

    return [
      {
        title: <Link href={'/'}>{menu[0].title}</Link>,
      },
      {
        title: <Link href={`/${menu[1].path_id}`}>{menu[1].title}</Link>,
      },
      {
        title: categoryTitle,
      },
    ];
  }, [header, categoryTitle]);

  return (
    <section className={s.category}>
      <div className={s.container}>
        <div className={s.content}>
          <Breadcrumbs items={breadcrumbsItems} />
          <h1 className={s.title}>{categoryTitle}</h1>
          <ReactMarkdown className={s.description}>{description}</ReactMarkdown>
          <button
            className={s.btn}
            onClick={() => {
              formRef!.current!.scrollIntoView({
                block: 'center',
                behavior: 'smooth',
              });
            }}
          >
            {categoryButton}
          </button>
        </div>
      </div>
    </section>
  );
};
