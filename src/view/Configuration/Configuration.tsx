import CustomButton from '@components/common/CustomButton/CustomButton';
import styles from './Configuration.module.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddDatabaseModal from './AddDatabaseModal/AddDatabaseModal';
import Questions from './Questions/Questions';
import AddQuestionModal from './AddQuestionModal/AddQuestionModal';

const Configuration = () => {
  const [addDatabaseModal, setDatabaseModal] = useState(false);
  const [addQuestionModal, setQuestionModal] = useState(false);

  return (
    <div className={styles.configuration}>
      <div className={styles.buttonsWrapper}>
        <CustomButton onClick={() => setDatabaseModal(true)}>
          <div className={styles.button}>
            <FontAwesomeIcon icon={faPlus} />
            <span>Dodaj bazę danych</span>
          </div>
        </CustomButton>
        <CustomButton onClick={() => setQuestionModal(true)}>
          <div className={styles.button}>
            <FontAwesomeIcon icon={faPlus} />
            <span>Dodaj pytanie</span>
          </div>
        </CustomButton>
      </div>
      <Questions />
      <AddDatabaseModal
        visible={addDatabaseModal}
        changeVisible={setDatabaseModal}
      />
      <AddQuestionModal
        visible={addQuestionModal}
        changeVisible={setQuestionModal}
      />
    </div>
  );
};

export default Configuration;
