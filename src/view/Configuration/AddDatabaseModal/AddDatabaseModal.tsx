import Modal from '@components/common/Modal/Modal';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form } from 'antd';
import { useState } from 'react';
import styles from './AddDatabaseModal.module.scss';
import { dbQuizActions } from '../../../store/dbQuiz/dbQuiz.actions';
import { useAppDispatch } from '../../../store/hooks';
import { toastService } from '../../../services/toastMessage/toastMessage';

interface Props {
  visible: boolean;
  changeVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddDatabaseModal = ({ visible, changeVisible }: Props) => {
  const [file, setFile] = useState<File | null>();

  const dispatch = useAppDispatch();

  const onSubmit = async () => {
    const formData = new FormData();

    console.log(file);

    if (file && file.type === 'application/sql') {
      return Promise.resolve(formData.append('file', file)).then(() => {
        dispatch(dbQuizActions.configureDbQuiz(formData)).then(() => {
          toastService.showSuccess('Dodano użytkownikow');
        });
      });
    }

    toastService.showError('Bledny format pliku');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setFile(files?.item(0));
  };

  return (
    <Modal
      title={'Dodaj bazę danych'}
      isVisible={visible}
      onClose={() => changeVisible(false)}
      okText={'Dodaj'}
      closeText='Zamknij'
      onConfirm={() => {
        onSubmit();
      }}
    >
      <Form className={styles.modal}>
        <div className={styles.buttonWrapper}>
          <input
            onChange={(e) => handleFileChange(e)}
            type='file'
            name='attachments'
            id='attachments'
            className={styles.input}
          />

          <label htmlFor={'attachments'} className={styles.label}>
            <FontAwesomeIcon icon={faLink} />
            <span>Dodaj plik</span>
          </label>
          <span>Max 25 MB</span>
        </div>
      </Form>
    </Modal>
  );
};

export default AddDatabaseModal;
