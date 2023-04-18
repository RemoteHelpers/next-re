import { FC, PropsWithChildren } from "react";
import Header from "../Header";
import styles from "@/styles/_layout/styles.module.scss";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main className={styles.main_section}>{children}</main>
    </>
  );
};

export default Layout;
