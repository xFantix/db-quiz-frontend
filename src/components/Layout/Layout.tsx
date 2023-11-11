import styles from "./Layout.module.scss";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const Layout = ({ children }: Props) => {
  return <div className={styles.layout}>{children}</div>;
};

export default Layout;
