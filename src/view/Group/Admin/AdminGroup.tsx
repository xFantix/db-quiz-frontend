import CustomButton from '@components/common/CustomButton/CustomButton';
import styles from './AdminGroup.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faMessage, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '../../../store/hooks';
import { groupActions } from '../../../store/group/group.actions';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import AddUserModal from './AddUserModal/AddUserModal';

const AdminGroup = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const [addUser, setAddUser] = useState(false);

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
          onClick={() => dispatch(groupActions.sendPasswordEmail(Number(id)))}
        >
          <div className={styles.button}>
            <FontAwesomeIcon icon={faLock} />
            <span> Wyślij wiadomość z hasłami</span>
          </div>
        </CustomButton>
        <CustomButton
          onClick={() => dispatch(groupActions.sendReminderEmail(Number(id)))}
        >
          <div className={styles.button}>
            <FontAwesomeIcon icon={faMessage} />
            <span> Wyślij wiadomość informacyjną</span>
          </div>
        </CustomButton>
      </div>
      <AddUserModal id={id} visible={addUser} changeVisible={setAddUser} />
    </div>
  );
};

export default AdminGroup;
