import { FC } from "react";
import styles from "@/styles/_header/styles.module.scss";

const Header: FC = () => {

  return (
    <header className={styles.header}>
      <select name="" id="">
        <option value="UA">UA</option>
        <option value="US">US</option>
      </select>
    </header>
  );
};

export default Header;
