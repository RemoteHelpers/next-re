export const TestimonialsIcon = ({ id }: any) => {
  switch (id) {
    case "next":
      return (
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="25"
            cy="25"
            r="24"
            fill="white"
            stroke="#FF6501"
            stroke-width="2"
          />
          <path
            d="M12 24C11.4477 24 11 24.4477 11 25C11 25.5523 11.4477 26 12 26V24ZM37.7071 25.7071C38.0976 25.3166 38.0976 24.6834 37.7071 24.2929L31.3431 17.9289C30.9526 17.5384 30.3195 17.5384 29.9289 17.9289C29.5384 18.3195 29.5384 18.9526 29.9289 19.3431L35.5858 25L29.9289 30.6569C29.5384 31.0474 29.5384 31.6805 29.9289 32.0711C30.3195 32.4616 30.9526 32.4616 31.3431 32.0711L37.7071 25.7071ZM12 26H37V24H12V26Z"
            fill="#FF6501"
          />
        </svg>
      );
    case "prev":
      return (
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="25"
            cy="25"
            r="24"
            transform="matrix(-1 0 0 1 50 0)"
            fill="white"
            stroke="#FF6501"
            stroke-width="2"
          />
          <path
            d="M38 24C38.5523 24 39 24.4477 39 25C39 25.5523 38.5523 26 38 26V24ZM12.2929 25.7071C11.9024 25.3166 11.9024 24.6834 12.2929 24.2929L18.6569 17.9289C19.0474 17.5384 19.6805 17.5384 20.0711 17.9289C20.4616 18.3195 20.4616 18.9526 20.0711 19.3431L14.4142 25L20.0711 30.6569C20.4616 31.0474 20.4616 31.6805 20.0711 32.0711C19.6805 32.4616 19.0474 32.4616 18.6569 32.0711L12.2929 25.7071ZM38 26H13V24H38V26Z"
            fill="#FF6501"
          />
        </svg>
      );
    case "quotes":
      return (
        <svg
          width="79"
          height="56"
          viewBox="0 0 79 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.3228 54.9371C16.0792 55.0184 15.6731 55.059 15.1047 55.059H13.8866C13.8053 55.059 13.6835 55.059 13.5211 55.059C13.4399 54.9777 13.2775 54.9371 13.0339 54.9371L12.303 54.8153L6.94327 54.4499L6.2124 54.2063H5.60334C5.60334 54.2875 5.48153 54.3281 5.23791 54.3281C4.99429 54.2469 4.50704 54.0845 3.77617 53.8408C3.0453 53.5972 2.55805 53.3536 2.31442 53.11C1.90839 52.5415 1.70537 51.77 1.70537 50.7955L1.33993 44.9486L0.852683 41.1724L0.487247 38.0053C0.162416 35.8939 0 33.4983 0 30.8184C0 29.1942 0.0406039 27.9355 0.121812 27.0422C0.365435 22.0073 1.42114 17.2973 3.28892 12.9121C5.96878 7.71475 9.62314 4.101 14.252 2.0708C18.2312 0.690268 22.0479 0 25.7023 0H26.9204L28.1385 0.121818C28.1385 0.852684 28.3416 1.82718 28.7476 3.0453C29.1536 4.83188 29.3567 5.84697 29.3567 6.09059V6.2124L30.8184 11.6939L30.9402 13.2775C30.9402 13.5211 31.0214 13.8053 31.1838 14.1302V14.6174C28.5852 14.6174 26.555 15.6325 25.0932 17.6627C23.8751 18.962 22.9412 20.8704 22.2916 23.3879C22.1292 24.5248 22.0479 25.2557 22.0479 25.5805C22.0479 26.1489 22.0886 26.4332 22.1698 26.4332C22.8194 26.6768 23.7939 26.7986 25.0932 26.7986C28.4228 26.7986 31.1026 27.0828 33.1328 27.6513C34.3509 27.8949 34.96 28.301 34.96 28.8694C35.2036 29.8439 35.366 31.2244 35.4472 33.011C35.6097 34.7164 35.7315 35.8533 35.8127 36.4217C35.9751 38.858 36.0563 40.9288 36.0563 42.6341L36.1781 45.8013V53.2318L35.4472 54.0845L29.113 54.9371H24.4842C23.3473 54.9371 22.5758 54.9777 22.1698 55.059C21.7637 55.059 21.3983 55.0996 21.0735 55.1808C20.8298 55.262 20.5456 55.3026 20.2208 55.3026H17.1755L16.3228 54.9371ZM58.3479 54.9371C58.1855 55.0184 57.7794 55.059 57.1298 55.059H55.9116L55.1808 54.9371L54.3281 54.8153L48.9684 54.4499L48.2375 54.2063H47.7502C47.669 54.2875 47.5066 54.3281 47.263 54.3281C47.0194 54.2469 46.5321 54.0845 45.8013 53.8408C45.0704 53.5972 44.5831 53.3536 44.3395 53.11C43.9335 52.5415 43.7305 51.77 43.7305 50.7955L43.365 44.9486L42.8778 41.1724L42.5123 38.0053C42.1875 35.8939 42.0251 33.5389 42.0251 30.9402C42.0251 29.2348 42.0657 27.9355 42.1469 27.0422C42.4717 21.8449 43.568 17.1349 45.4358 12.9121C47.9533 7.71475 51.567 4.101 56.2771 2.0708C60.2563 0.690268 64.073 0 67.7274 0H68.9455L70.1636 0.121818C70.1636 0.852684 70.3666 1.82718 70.7727 3.0453C71.1787 4.26342 71.3817 5.27852 71.3817 6.09059V6.2124L72.8435 11.6939V12.303C72.9247 12.3842 72.9653 12.709 72.9653 13.2775C72.9653 13.5211 73.0465 13.8053 73.2089 14.1302V14.6174C70.6103 14.6174 68.5801 15.6325 67.1183 17.6627C65.7378 19.2057 64.8039 21.1141 64.3167 23.3879C64.1542 23.9563 64.073 24.6872 64.073 25.5805C64.073 26.1489 64.1136 26.4332 64.1948 26.4332C64.8445 26.6768 65.819 26.7986 67.1183 26.7986C70.4479 26.7986 73.1277 27.0828 75.1579 27.6513C76.2948 27.8949 76.9039 28.301 76.9851 28.8694C77.2287 29.8439 77.3911 31.2244 77.4723 33.011C77.6348 34.7164 77.7566 35.8533 77.8378 36.4217C78.0814 39.1828 78.2032 42.3093 78.2032 45.8013V53.2318L77.4723 54.0845L71.1381 54.9371H66.5093C65.3724 54.9371 64.6009 54.9777 64.1948 55.059C63.7888 55.059 63.4234 55.0996 63.0985 55.1808C62.8549 55.262 62.5707 55.3026 62.2459 55.3026H59.2006L58.3479 54.9371Z"
            fill="#ebebeb"
            fill-opacity="0.8"
          />
        </svg>
      );
    default:
      return <svg></svg>;
  }
};