interface BreadcrumsIconProps {
	id: "separator";
}

export const BreadcrumbsIcon = ({ id }: BreadcrumsIconProps) => {
	switch (id) {
		case "separator":
			return (
				<svg
					width="10"
					height="18"
					viewBox="0 0 10 18"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M1 17L9 9L1 1"
						stroke="#FF6501"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			);

		default:
			return <svg></svg>;
	}
};
