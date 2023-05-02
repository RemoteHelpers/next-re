import type { AppProps } from "next/app";
import "@/shared/styles/globals.scss";
import { VacanciesProvider } from "@/context";

function App({ Component, pageProps }: AppProps) {
	return (
		<VacanciesProvider>
			<Component {...pageProps} />
		</VacanciesProvider>
	);
}

export default App;
