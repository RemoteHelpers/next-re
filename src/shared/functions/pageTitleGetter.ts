import type { IHeader, IMenu } from '../types/HeaderTypes';

const getPageTitle = (header: IHeader, pagePath: string) => {
  return header.menu.find(({ path_id }: IMenu) => path_id === pagePath)?.title!;
};

export default getPageTitle;
