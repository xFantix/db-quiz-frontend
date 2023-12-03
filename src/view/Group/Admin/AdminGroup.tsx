import CustomButton from '@components/common/CustomButton/CustomButton';
import styles from './AdminGroup.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faClose,
  faEnvelope,
  faLock,
  faMessage,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { groupActions } from '../../../store/group/group.actions';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AddUserModal from './AddUserModal/AddUserModal';
import { format } from 'date-fns';
import { toastService } from '../../../services/toastMessage/toastMessage';
import { Tooltip } from 'antd';

const AdminGroup = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const [addUser, setAddUser] = useState(false);

  const removeUserFromGroup = (id: number) => {
    dispatch(groupActions.removeUserFromGroup(id));
  };

  const messageWithPasswordToUser = (id: number) => {
    dispatch(groupActions.sendPasswordEmailToUser(id));
  };

  useEffect(() => {
    dispatch(groupActions.getGroup(Number(id)));
  }, []);

  const groupInformation = useAppSelector((state) => state.group.group);

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttonWrapper}>
        <CustomButton onClick={() => setAddUser(true)}>
          <div className={styles.button}>
            <FontAwesomeIcon icon={faPlus} />
            <span>Dodaj użytkownika</span>
          </div>
        </CustomButton>
        <CustomButton
          disabled={!groupInformation?.users.length}
          onClick={() =>
            dispatch(groupActions.sendPasswordEmailToGroup(Number(id))).then(
              () => {
                toastService.showSuccess('Wysłano wiadomość');
              },
            )
          }
        >
          <div className={styles.button}>
            <FontAwesomeIcon icon={faLock} />
            <span> Wyślij wiadomość z hasłami</span>
          </div>
        </CustomButton>
        <CustomButton
          disabled={!groupInformation?.users.length}
          onClick={() =>
            dispatch(groupActions.sendReminderEmail(Number(id))).then(() => {
              toastService.showSuccess('Wysłano wiadomość');
            })
          }
        >
          <div className={styles.button}>
            <FontAwesomeIcon icon={faMessage} />
            <span> Wyślij wiadomość informacyjną</span>
          </div>
        </CustomButton>
      </div>
      {groupInformation && (
        <div className={styles.main}>
          <div className={styles.informationRow}>
            <h2
              className={styles.header}
            >{`${groupInformation?.name} #${groupInformation.id}`}</h2>
            <div className={styles.capsule}>
              <FontAwesomeIcon icon={faCalendarDays} />
              {format(
                new Date(groupInformation.startTimeQuiz),
                'dd-MM-yyyy HH:mm',
              )}
            </div>
            <div className={styles.capsule}>
              <FontAwesomeIcon icon={faCalendarDays} />
              {format(
                new Date(groupInformation.endTimeQuiz),
                'dd-MM-yyyy HH:mm',
              )}
            </div>
          </div>
          <table className={styles.users}>
            <tr className={styles.header}>
              <th>Użytkownik</th>
              <th>Index</th>
              <th>Email</th>
              <th>Wynik</th>
              <th>Akcje</th>
            </tr>
            {groupInformation.users.map((user, index) => (
              <tr className={styles.row} key={index}>
                <td className={styles.cell}>{`${index + 1}. ${user.name} ${
                  user.surname
                }`}</td>
                <td className={styles.cell}>{user.index_umk}</td>
                <td className={styles.cell}>{user.email}</td>
                <td className={styles.cell}>0%</td>
                <td className={styles.cellAction}>
                  <Tooltip title={'Usuń użytkownika'}>
                    <FontAwesomeIcon
                      className={styles.remove}
                      onClick={() => removeUserFromGroup(user.id)}
                      icon={faClose}
                    />
                  </Tooltip>
                  <Tooltip title={'Wyślij hasło ponownie'}>
                    <FontAwesomeIcon
                      className={styles.email}
                      onClick={() => messageWithPasswordToUser(user.id)}
                      icon={faEnvelope}
                    />
                  </Tooltip>
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
      <AddUserModal id={id} visible={addUser} changeVisible={setAddUser} />
    </div>
  );
};

export default AdminGroup;
