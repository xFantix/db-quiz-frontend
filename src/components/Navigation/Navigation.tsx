import {
  faDatabase,
  faRightFromBracket,
  faTableColumns,
} from '@fortawesome/free-solid-svg-icons';
import styles from './Navigation.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import config from '../../utils/config';
import { Tooltip } from 'antd';
import { removeLocalStorageUser } from '../../utils/auth';
import { history } from '../../utils/history';
import { useAppSelector } from '../../store/hooks';

const Navigation = () => {
  const userNavigation = [
    {
      icon: faTableColumns,
      label: 'Dashboard',
      to: config.routes.dashboard,
    },
  ];

  const adminNavigation = [
    ...userNavigation,
    {
      icon: faDatabase,
      label: 'Konfiguracja bazy',
      to: config.routes.configuration,
    },
  ];

  const logoutUser = () => {
    removeLocalStorageUser();
    history.push(config.routes.login);
  };

  const { isAdmin } = useAppSelector((state) => state.user.userInformation);

  const navList = isAdmin ? adminNavigation : userNavigation;

  return (
    <nav className={styles.navigation}>
      {navList.map((nav, id) => (
        <NavLink key={id} className={styles.navIcon} to={nav.to}>
          <Tooltip title={nav.label} placement='right'>
            <FontAwesomeIcon icon={nav.icon} />
          </Tooltip>
        </NavLink>
      ))}
      <button className={styles.navButton} onClick={logoutUser}>
        <Tooltip title={'Wyloguj'} placement='right'>
          <FontAwesomeIcon icon={faRightFromBracket} />
        </Tooltip>
      </button>
    </nav>
  );
};

export default Navigation;
