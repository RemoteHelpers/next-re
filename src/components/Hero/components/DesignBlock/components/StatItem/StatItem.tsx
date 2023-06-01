import { FC, useEffect } from "react";
import s from "./StatItem.module.scss";
import Image from "next/image";
import { PhotoAPI } from "@/constants";
import useWebAnimations from "@wellyshen/use-web-animations";
import { useRouter } from "next/router";

const rotateKeyframes = [
	{
		transform: "rotate(0deg)",
	},
	{
		transform: "rotate(360deg)",
	},
];
const rotateOpts:
	| number
	| (KeyframeAnimationOptions & { pseudoElement?: string }) = {
	delay: 800,
	duration: 20000,
	iterations: 1,
	composite: "add",
	easing: "linear",
	direction: "reverse",
};
interface StatItemProps {
	id: string;
	image: {
		url: string;
		alternativeText: string;
		width: number;
		height: number;
	};
	value: string;
	text: string;
}

export const StatItem: FC<StatItemProps> = ({
	id,
	image,
	value,
	text,
}: StatItemProps) => {
	const router = useRouter();
	const circleAnim = useWebAnimations<HTMLDivElement>({
		keyframes: rotateKeyframes,
		animationOptions: rotateOpts,
	});
	useEffect(() => {
		if (circleAnim.playState === "finished") {
			circleAnim.animate({
				keyframes: rotateKeyframes,
				animationOptions: { ...rotateOpts, delay: 0 },
			});
		}
	}, [circleAnim, circleAnim.playState]);
	useEffect(() => {
		circleAnim.getAnimation()?.finish();
		circleAnim.getAnimation()?.play();
	}, [router.locale]);

	return (
		<div className={s.stat_item} id={id} ref={circleAnim.ref}>
			<div className={s.fill_icon}>
				<Image
					src={PhotoAPI + image.url}
					alt={image.alternativeText}
					width={image.width}
					height={image.height}></Image>
			</div>
			<div className={s.stats}>
				<div className={s.value}>{value}</div>
				<div className={s.text}>{text}</div>
			</div>
		</div>
	);
};
