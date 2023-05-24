interface Props {
  id: string;
}

export const ContactSvg = ({ id }: Props) => {
  switch (id) {
    case "telegram":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="11.5" stroke="#FF6501" />
          <path
            d="M7.74272 13.1443C7.74017 13.1458 7.73716 13.1461 7.73436 13.1453L4.50891 12.1754C3.81071 11.9697 3.80683 11.506 4.66536 11.1731L17.2498 6.48573C17.9803 6.199 18.3941 6.56177 18.1574 7.47058L16.015 17.2194C15.865 17.9138 15.4319 18.0796 14.8306 17.7592L12.1969 15.8798C11.8101 15.6038 11.2825 15.6381 10.9347 15.9618L9.99496 16.8367C9.83722 16.9838 9.70921 17.1097 9.46614 17.1408C9.22435 17.1733 9.02524 17.1034 8.87913 16.717L7.75822 13.1505C7.75617 13.144 7.74866 13.141 7.74272 13.1443Z"
            fill="#FF6501"
          />
        </svg>
      );
    default:
      return <svg></svg>;
  }
};