import React, { FC, ReactNode } from "react";
import s from "./Main.module.scss";

export type MainProps = {
	children: ReactNode;
};

export const Main: FC<MainProps> = ({ children }: MainProps) => {
	return <main className={s.main}>{children}</main>;
};
