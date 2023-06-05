import React, {
	ReactNode,
	createContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useRouter } from "next/router";
import { IHeader } from "@/shared/types/HeaderTypes";
import { getHeaderData } from "@/services";

export type ContextValue = {
	navURL: string;
	setNavURL: (string: string) => void;
	isLoading: boolean;
	setIsLoading: (boolean: boolean) => void;
	currentLang: string;
	setCurrentLang: (string: string) => void;
	header: IHeader;
	setHeader: (header: IHeader) => void;
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
};
export const GlobalContext = createContext<ContextValue>(defaultValue);

export const GlobalProvider: React.FC<ProviderProps> = ({ children }) => {
	const [navURL, setNavURL] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const { locale, asPath } = useRouter();
	const initialLang = locale === "uk" ? "UA" : locale?.toUpperCase()!;
	const [currentLang, setCurrentLang] = useState<string>(initialLang);
	const [header, setHeader] = useState<IHeader>({} as IHeader);

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
		setIsLoading(true);
		getHeaderData(locale)
			.then((res) => {
				setHeader(res);
				setIsLoading(false);
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
		}),
		[isLoading, navURL, currentLang]
	);

	return (
		<GlobalContext.Provider value={contextValue}>
			{children}
		</GlobalContext.Provider>
	);
};
