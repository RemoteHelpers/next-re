import type { FC } from 'react';
import s from './Spheres.module.scss';
import type { INavUrlState, ICategory } from '@/shared/types';
import { Sphere } from './components/Sphere';

type Props = { title: string; categories: ICategory[]; navUrlState: INavUrlState; }
const Spheres: FC<Props> = ({ title, categories, navUrlState }) => {
  return (
    <section className={s.spheres}>
      <div className={s.container}>
        <h2 className={s.title}>{title}</h2>
        
        <div className={s.spheres_cards}>
          {categories.map(cat => {
            if (cat.attributes.categorySlug === 'other') return null;
            return (
              <Sphere
                key={cat.id}
                categorySlug={cat.attributes.categorySlug}
                categoryTitle={cat.attributes.categoryTitle}
                navUrlState={navUrlState}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Spheres
