import styles from './GroupCard.module.scss';
import Background from '@assets/graphics/backgroundCard.svg';
import {
  faCalendarDays,
  faClock,
  faClose,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image } from 'antd';
import { format } from 'date-fns';
import { GroupList } from '../../types/services/group';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { groupActions } from '../../store/group/group.actions';
import { toastService } from '../../services/toastMessage/toastMessage';
import { history } from '../../utils/history';
import config from '../../utils/config';

interface Props {
  group: GroupList;
}

const GroupCard = ({ group }: Props) => {
  const { id, name, startTimeQuiz, endTimeQuiz, users, time } = group;

  const dispatch = useAppDispatch();

  const { isAdmin } = useAppSelector((store) => store.user.userInformation);

  const removeGroup = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(groupActions.removeGroup(id)).then(() => {
      toastService.showSuccess('Grupa została usunięta');
    });
  };

  return (
    <div
      onClick={() =>
        history.push(config.routes.group.replace(':id', String(id)))
      }
      className={styles.groupCard}
    >
      {isAdmin && (
        <button onClick={(e) => removeGroup(e)} className={styles.removeButton}>
          <FontAwesomeIcon icon={faClose} />
        </button>
      )}
      <div className={styles.top}>
        <Image preview={false} className={styles.image} src={Background} />
        <div className={styles.tagMembers}>
          <FontAwesomeIcon icon={faUser} />
          {users.length}
        </div>
        <div className={styles.tagTime}>
          <FontAwesomeIcon icon={faClock} />
          {time}
        </div>
        <div className={styles.tagStart}>
          <FontAwesomeIcon icon={faCalendarDays} />
          {format(new Date(startTimeQuiz), 'dd-MM-yyyy HH:mm')}
        </div>
        <div className={styles.tagEnd}>
          <FontAwesomeIcon icon={faCalendarDays} />
          {format(new Date(endTimeQuiz), 'dd-MM-yyyy HH:mm')}
        </div>
      </div>
      <div className={styles.bottom}>
        <h2 className={styles.groupName}>{name}</h2>
      </div>
    </div>
  );
};

export default GroupCard;
