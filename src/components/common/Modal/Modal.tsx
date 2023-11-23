import { ReactNode, useRef } from 'react';
import { Button, Modal as AntdModal, ModalProps } from 'antd';

import styles from './Modal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

type Props = {
  onConfirm: () => void;
  onClose: () => void;
  isVisible: boolean;
  description?: string;
  className?: string;
  okText?: string;
  okButtonType?: 'primary' | 'default';
  closeText?: string;

  children?: JSX.Element;
  disableButtons?: boolean;
  closeIcon?: ReactNode;
  confirmDisabled?: boolean;
  closeOnConfirm?: boolean;

  onAdditionalAction?: () => void;
  additionalButtonText?: string;
  additionalButtonIcon?: ReactNode;
  additionalButtonClassName?: string;
} & ModalProps;

const Modal = ({
  isVisible,
  onClose,
  onConfirm,
  description = '',
  className = '',
  okText = 'Save',
  children,
  disableButtons,
  closeIcon,
  confirmDisabled,
  closeText = 'Close',
  onAdditionalAction,
  additionalButtonIcon,
  additionalButtonText = '',
  additionalButtonClassName = '',
  closeOnConfirm = true,
  okButtonType = 'primary',
  ...modalProps
}: Props) => {
  const ref = useRef(null);

  const getFooter = () => {
    if (disableButtons) return null;

    return (
      <div className={styles.footer}>
        <div>
          {onAdditionalAction ? (
            <Button
              type='text'
              aria-label='additional-action'
              icon={additionalButtonIcon}
              className={`${styles.buttonAdditional} ${additionalButtonClassName}`}
              shape='round'
              key='additional'
              onClick={onAdditionalAction}
            >
              {additionalButtonText}
            </Button>
          ) : null}
        </div>
        <div>
          <Button
            type='text'
            shape='round'
            key='back'
            onClick={onClose}
            aria-label='modal-close'
          >
            {closeText}
          </Button>
          <Button
            aria-label='modal-ok'
            shape='round'
            key='submit'
            type={okButtonType}
            disabled={confirmDisabled}
            loading={modalProps.confirmLoading}
            onClick={async () => {
              await onConfirm();
              closeOnConfirm && onClose();
            }}
            {...modalProps.okButtonProps}
          >
            {okText}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <AntdModal
      {...modalProps}
      open={isVisible}
      onCancel={onClose}
      closeIcon={closeIcon ? closeIcon : <FontAwesomeIcon icon={faClose} />}
      className={`${styles.modal} ${className}`}
      centered={true}
      cancelButtonProps={{ shape: 'round', type: 'text' }}
      okText={okText}
      footer={getFooter()}
      bodyStyle={{
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 200px)',
        ...modalProps.bodyStyle,
      }}
    >
      {description ? (
        <div className={styles.description}>{description}</div>
      ) : null}
      <div ref={ref}>{children}</div>
    </AntdModal>
  );
};

export default Modal;
