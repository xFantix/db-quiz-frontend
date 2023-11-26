import { Button } from 'antd';
import styles from './CustomButton.module.scss';

interface Props {
  children: string | JSX.Element | JSX.Element[];
  onClick: () => void;
  disabled?: boolean;
}

const CustomButton = ({ children, onClick, disabled }: Props) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      className={styles.customButton}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
