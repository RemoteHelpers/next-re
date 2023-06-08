import React, {
	ReactNode,
	createContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useRouter } from "next/router";
import { IHeader } from "@/shared/types/HeaderTypes";
import { getAllVacancies, getFooterData, getFormData, getHeaderData } from "@/services";
import { IFooterData } from "@/shared/types/FooterTypes";
import { IFormData } from "@/shared/types/FormTypes";
import { IVacancy } from "@/shared/types/VacanciesTypes";

export type ContextValue = {
	navURL: string;
	setNavURL: (string: string) => void;
	isLoading: boolean;
	setIsLoading: (boolean: boolean) => void;
	currentLang: string;
	setCurrentLang: (string: string) => void;
	header: IHeader;
	setHeader: (header: IHeader) => void;
	footer: IFooterData;
	setFooter: (footer: IFooterData) => void;
	formData: IFormData;
	setFormData: (formData: IFormData) => void;
	vacancies: IVacancy[];
	setVacancies: (vacancies: IVacancy[]) => void;
};
export interface ProviderProps {
	children: ReactNode;
}

const defaultValue: ContextValue = {
	navURL: "",
	setNavURL: () => {},
	isLoading: true,
	setIsLoading: () => {},
	currentLang: "",
	setCurrentLang: () => {},
	header: {} as IHeader,
	setHeader: () => {},
	footer: {} as IFooterData,
	setFooter: () => {},
	formData: {} as IFormData,
	setFormData: () => {},
	vacancies: {} as IVacancy[],
	setVacancies: () => {},
};
export const GlobalContext = createContext<ContextValue>(defaultValue);

export const GlobalProvider: React.FC<ProviderProps> = ({ children }) => {
	const [navURL, setNavURL] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const { locale, asPath } = useRouter();
	const initialLang = locale === "uk" ? "UA" : locale?.toUpperCase()!;
	const [currentLang, setCurrentLang] = useState<string>(initialLang);
	const [header, setHeader] = useState<IHeader>({} as IHeader);
	const [footer, setFooter] = useState<IFooterData>({} as IFooterData);
	const [formData, setFormData] = useState<IFormData>({} as IFormData);
	const [vacancies, setVacancies] = useState<IVacancy[]>({} as IVacancy[]);

	useEffect(() => {
		if (!navURL) return;
		if (asPath === navURL || asPath === `/${navURL}`) setNavURL("");
		else setIsLoading(true);
	}, [navURL]);

	useEffect(() => {
		setIsLoading(false);
		setNavURL("");
	}, [locale, asPath]);

	useEffect(() => {
		setIsLoading((prev) => true);
		getHeaderData(locale)
			.then((res) => {
				setHeader(res);
				setIsLoading((prev) => false);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [locale]);
	useEffect(() => {
		setIsLoading((prev) => true);
		getFooterData(locale!)
			.then((res) => {
				setFooter(res);
				setIsLoading((prev) => false);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [locale]);
	useEffect(() => {
		setIsLoading((prev) => true);
		getFormData(locale!)
			.then((res) => {
				setFormData(res);
				setIsLoading((prev) => false);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [locale]);
	useEffect(() => {
		setIsLoading((prev) => true);
		getAllVacancies(locale!)
			.then((res) => {
				setVacancies(res);
				setIsLoading((prev) => false);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [locale]);

	const contextValue = useMemo(
		() => ({
			isLoading,
			setIsLoading,
			navURL,
			setNavURL,
			currentLang,
			setCurrentLang,
			header,
			setHeader,
			footer,
			setFooter,
			formData,
			setFormData,
			vacancies,
			setVacancies,
		}),
		[isLoading, navURL, currentLang, header, footer, vacancies]
	);

	return (
		<GlobalContext.Provider value={contextValue}>
			{children}
		</GlobalContext.Provider>
	);
};
