import { FC, LegacyRef, useCallback, useEffect, useRef, useState } from "react";
import { ScrollUpIcon } from "../IconComponents/ScrollUpIcon";
import s from "./ScrollUpButton.module.scss";

interface ScrollUpButtonProps {
}

export const ScrollUpButton: FC<ScrollUpButtonProps> = ({
}: ScrollUpButtonProps) => {
	const [show, setShow] = useState(false);
	useEffect(() => {
		const onScroll = (e: any) => {			
			if (window.scrollY > 50) {
				setShow(true);
			} else {
				setShow(false);
			}
		};
		if (window) {
			window.addEventListener("scroll", onScroll);
		}
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	const scrollToTop = useCallback(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);
	return (
		<button
			className={s.btn + (show ? ` ${s.show}` : "")}
			onClick={scrollToTop}>
			<ScrollUpIcon />
		</button>
	);
};
