import { Button } from 'antd';
import styles from './CustomButton.module.scss';

interface Props {
  children: string | JSX.Element | JSX.Element[];
  onClick: () => void;
}

const CustomButton = ({ children, onClick }: Props) => {
  return (
    <Button onClick={onClick} className={styles.customButton}>
      {children}
    </Button>
  );
};

export default CustomButton;
