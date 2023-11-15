import {
  faRightFromBracket,
  faTableColumns,
} from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../store/hooks";
import styles from "./Navigation.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import config from "../../utils/config";
import { Tooltip } from "antd";
import { removeLocalStorageUser } from "../../utils/auth";
import { history } from "../../utils/history";

const Navigation = () => {
  const navList = [
    {
      id: 0,
      icon: faTableColumns,
      label: "Dashboard",
      to: config.routes.dashboard,
    },
  ];

  const logoutUser = () => {
    removeLocalStorageUser();
    history.push(config.routes.login);
  };

  return (
    <nav className={styles.navigation}>
      {navList.map((nav) => (
        <NavLink key={nav.id} className={styles.navIcon} to={nav.to}>
          <Tooltip title={nav.label} placement="right">
            <FontAwesomeIcon icon={nav.icon} />
          </Tooltip>
        </NavLink>
      ))}
      <button className={styles.navButton} onClick={logoutUser}>
        <Tooltip title={"Wyloguj"} placement="right">
          <FontAwesomeIcon icon={faRightFromBracket} />
        </Tooltip>
      </button>
    </nav>
  );
};

export default Navigation;
