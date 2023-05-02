import { VacancyCard } from "./components/VacancyCard";
import { IVacancy } from "@/shared/types";
import s from "./VacanciesList.module.scss";

export const VacanciesList = ({ vacancies }: any) => {
  return (
    <section className={s.vacancies_list}>
      <div className={s.container}>
        {vacancies?.length > 0 &&
          vacancies.map((vacancy: IVacancy) => (
            <VacancyCard key={vacancy.id} vacancy={vacancy} />
          ))}
      </div>
    </section>
  );
};
