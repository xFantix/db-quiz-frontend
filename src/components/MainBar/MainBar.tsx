import { Image } from "antd";
import Logo from "@assets/graphics/simpleLogo.png";
import styles from "./MainBar.module.scss";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MainBar = () => {
  return (
    <header className={styles.bar}>
      <div className={styles.leftSide}>
        <Image preview={false} className={styles.logo} src={Logo} alt="logo" />
      </div>
      <div className={styles.rightSide}>
        <div className={styles.tagName}>
          <FontAwesomeIcon className={styles.userIcon} icon={faUser} />
          <span className={styles.userName}>Kamil Jankowski</span>
        </div>
      </div>
    </header>
  );
};

export default MainBar;
