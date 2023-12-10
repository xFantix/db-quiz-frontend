import CustomButton from '@components/common/CustomButton/CustomButton';
import styles from './Configuration.module.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddDatabaseModal from './AddDatabaseModal/AddDatabaseModal';
import Questions from './Questions/Questions';

const Configuration = () => {
  const [addDatabaseModal, setDatabaseModal] = useState(false);

  return (
    <div className={styles.configuration}>
      <div className={styles.buttonsWrapper}>
        <CustomButton onClick={() => setDatabaseModal(true)}>
          <div className={styles.button}>
            <FontAwesomeIcon icon={faPlus} />
            <span>Dodaj bazę danych</span>
          </div>
        </CustomButton>
      </div>
      <Questions />
      <AddDatabaseModal
        visible={addDatabaseModal}
        changeVisible={setDatabaseModal}
      />
    </div>
  );
};

export default Configuration;
