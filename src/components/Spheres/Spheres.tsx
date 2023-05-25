import type { FC } from 'react';
import s from './Spheres.module.scss';
import type { ICategory } from '@/shared/types/CategoriesTypes';
import { Sphere } from './components/Sphere';

interface SpheresProps {
  title: string;
  categories: ICategory[];
}

export const Spheres: FC<SpheresProps> = ({ title, categories }) => {
  return (
    <section className={s.spheres}>
      <div className={s.container}>
        <h2 className={s.title}>{title}</h2>
        <div className={s.spheres_cards}>
          {categories.map(cat => {
            if (cat.attributes.categorySlug === 'other') {
              return null;
            }
            return (
              <Sphere
                key={cat.id}
                categorySlug={cat.attributes.categorySlug}
                categoryTitle={cat.attributes.categoryTitle}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
