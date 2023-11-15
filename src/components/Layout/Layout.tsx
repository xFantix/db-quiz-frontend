import MainBar from "@components/MainBar/MainBar";
import styles from "./Layout.module.scss";
import Navigation from "@components/Navigation/Navigation";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const Layout = ({ children }: Props) => {
  return (
    <div className={styles.layout}>
      <MainBar />
      <main className={styles.mainSection}>
        <Navigation />
        {children}
      </main>
    </div>
  );
};

export default Layout;
