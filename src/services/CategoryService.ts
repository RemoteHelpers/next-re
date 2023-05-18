import axios from 'axios';
import { API } from '@/constants';

const categoriesInstance = axios.create({
  baseURL: API,
  params: {
    populate: '*',
  },
});

export const getCategories = async (lang: string) => {
  try {
    const res = await categoriesInstance.get(`/categories?locale=${lang}`);
    return res.data.data as Promise<[]>;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getCategoryBySlug = async (slug: string, lang: string) => {
  try {
    const res = await categoriesInstance.get(`/categories?locale=${lang}`);
    const categories = res.data.data;
    const category = categories.filter((cat: any) => cat.attributes.categorySlug === slug)[0];
    return category as Promise<[]>;
  } catch (error) {
    console.error(error);
    return error;
  }
};
