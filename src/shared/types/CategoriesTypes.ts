export interface ICategoryAttributes {
  categorySlug: string;
  categoryTitle: string;
  createdAt: Date;
  description: string;
  locale: string;
  publishedAt: Date;
  updatedAt: Date;
}

export interface ICategory {
  id: number;
  attributes: ICategoryAttributes;
}
