import { FC } from "react";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";
// import type { MainProps } from "./components/Main";
import s from "./Layout.module.scss";

// export type LayoutProps = MainProps & {};

export const Layout = ({ children, footerData }: any) => {
  return (
    <div className={s.wrapper}>
      <Header />
      <Main>{children}</Main>
      <Footer footerData={footerData}/>
    </div>
  );
};
