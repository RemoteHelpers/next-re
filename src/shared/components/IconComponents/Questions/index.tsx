export const QuestionVector = ({ id }: any) => {
  switch (id) {
    case "vector":
      return (
        <svg
          width="25"
          height="25"
          viewBox="0 0 35 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M28.3494 0.462157L8.61792 0.462153L8.61792 6.96117H23.7532L0.772221 29.9421L5.36842 34.5383L28.3494 11.5574L28.3494 26.6926L34.8484 26.6926L34.8484 6.96117C34.8481 5.23761 34.1633 3.58471 32.9446 2.36596C31.7259 1.14721 30.073 0.462417 28.3494 0.462157Z"
            fill="#FF6501"
          />
        </svg>
      );
    default:
      return <svg></svg>;
  }
};
