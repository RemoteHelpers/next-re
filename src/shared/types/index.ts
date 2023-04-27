export interface IVacancy {
    id: number,
    attributes: IVacancyAttr    
}
export interface IVacancyAttr{
    title: string,
    subTitle: string,
    cardDescription: string,
    isHot: boolean,
    vacancySlug: string,
    videoLink: string,
    categories: ICatData
}
export interface ICatData {
    data: IVacCat[]
}

export interface IVacCat{
    id: number,
    attributes: ICatAttr
}

export interface ICatAttr{
    categorySlug: string,
    categoryTitle: string,
    createdAt: string,
    description: string,
    locale: string
}

