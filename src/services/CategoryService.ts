import axios from 'axios';
import { API } from '@/constants';
import { ICategory } from '@/shared/types/CategoriesTypes';

type Error = any;

const categoriesInstance = axios.create({
  baseURL: API,  
});

export const getCategories = async (lang: string, pop: string = '*'): Promise<ICategory[] | Error> => {
  const params = {
    populate: pop
  }
  try {
    const res = await categoriesInstance.get(`/categories?locale=${lang}`, { params });
    return res.data.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getCategoryBySlug = async (lang: string, slug: string, pop: string = '*') => {
  const params = {
    populate: pop
  }
  try {
    const res = await categoriesInstance.get(`/categories?locale=${lang}`, { params });
    const categories = res.data.data;
    const category = categories.filter((cat: any) => cat.attributes.categorySlug === slug)[0];
    return category as Promise<[]>;
  } catch (error) {
    console.error(error);
    return error;
  }
};
