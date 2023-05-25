import React, { FC, ReactNode } from "react";
import s from "./Main.module.scss";
import { ScrollUpButton } from "@/shared/components/ScrollUpButton";

export type MainProps = {
	children: ReactNode;
};

export const Main: FC<MainProps> = ({ children }: MainProps) => {
	return (
		<main className={s.main}>
			{children}
			<ScrollUpButton />
		</main>
	);
};
