import type { IHeader, IMenu } from '../types/HeaderTypes';

export const getPageTitle = (header: IHeader, pagePath: string) => {
  return header.menu.find(({ path_id }: IMenu) => path_id === pagePath)?.title!;
};
