import Image from "next/image";
import { FC, useEffect } from "react";
import s from "./DesignBlock.module.scss";
import circle from "@/shared/images/home/hero/blue_circle.svg";
import crazy_cat from "@/shared/images/home/hero/crazy_cat.svg";
import like from "@/shared/icons/home/hero/like.svg";
import smile from "@/shared/icons/home/hero/smile.svg";
import globe from "@/shared/icons/home/hero/globe.svg";
import { StatItem } from "./components/StatItem";
import useWebAnimations from "@wellyshen/use-web-animations";
import { useRouter } from "next/router";


const icons = [
	{
		name: "like",
		src: like,
		animation: null as any,
	},
	{
		name: "smile",
		src: smile,
		animation: null as any,
	},
	{
		name: "globe",
		src: globe,
		animation: null as any,
	},
];

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
	duration: 5000,
	iterations: 1,
	composite: "add",
	easing: "linear",
};

interface DesignBlockProps {
	data: any;
}

export const DesignBlock: FC<DesignBlockProps> = ({
	data,
}: DesignBlockProps) => {
	const router = useRouter();
	/* animation for black circle */
	const circleAnim = useWebAnimations<HTMLDivElement>({
		keyframes: rotateKeyframes,
		animationOptions: rotateOpts,
    });
	for (let i = 0; i < icons.length; i++) {
		icons[i].animation = useWebAnimations<HTMLDivElement>({
			keyframes: rotateKeyframes,
			animationOptions: { ...rotateOpts, direction: "reverse" },
		});
	}

	useEffect(() => {
		if (circleAnim.playState === "finished") {
			circleAnim.animate({
				keyframes: rotateKeyframes,
				animationOptions: {
					...rotateOpts,
					delay: 0,
				},
			});
        }
		icons.forEach((icon) => {
			if (icon.animation.playState === "finished") {
				icon.animation.animate({
					keyframes: rotateKeyframes,
					animationOptions: {
						...rotateOpts,
                        delay: 0,
                        direction: "reverse"
					},
				});
			}
		});
	}, [circleAnim, circleAnim.playState, icons]);

	useEffect(() => {
		circleAnim.getAnimation()?.finish();
		circleAnim.getAnimation()?.play();
		for (let i = 0; i < icons.length; i++) {
			icons[i].animation.getAnimation().finish();
			icons[i].animation.getAnimation().play();
		}
	}, [router.locale]);

	return (
		<div className={s.design}>
			<div className={s.circle} ref={circleAnim.ref}>
                {data.heroStats.map((item: any, index: number) => (
                    <StatItem
                        key={item.id}
						id={index + ""}
						image={item.heroStatIcon.data.attributes}
						value={item.heroStatValue}
						text={item.heroStatText}
					/>
				))}
				{icons.map(({ name, src, animation }) => (
					<div className={s.icon} id={s[name]} ref={animation?.ref} key={name}>
						<Image src={src} alt={name} />
					</div>
				))}
			</div>
			<div className={s.backgcircle}>
				<Image src={circle} alt="blue bg"></Image>
				<div className={s.cat}>
					<Image src={crazy_cat} alt="crazy_cat"></Image>
				</div>
			</div>
		</div>
	);
};
