import { useContext, useEffect } from 'react';
import axios from 'axios';
import type { AppProps } from 'next/app';
// import { GlobalContextProvider } from '@/context/globalContext';
import { API, requestPagStart, requestPagLimit } from '@/constants';
import { GlobalContext } from '@/context/globalContext';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

export default function App({ Component, pageProps }: AppProps) {
  // const { setVacancies } = useContext(GlobalContext);

  const getVacancies = async () => {
    await axios
      .get(`${API}/vacancies?locale=RU&${requestPagStart}=0&${requestPagLimit}=-1&populate=*`)
      .then(res => {
        // setVacancies(res.data.data);
        console.log(res.data.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    // getVacancies();
  }, []);

  return (
    // <GlobalContextProvider>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
    // </GlobalContextProvider>
  );
}
