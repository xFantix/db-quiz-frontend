import { Oval } from 'react-loader-spinner';
import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.wrapper}>
      <Oval
        height={80}
        width={80}
        color='#0E68CF'
        wrapperClass=''
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor='#0E68CF'
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default Loader;
