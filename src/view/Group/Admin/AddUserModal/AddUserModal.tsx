import Modal from '@components/common/Modal/Modal';
import { Form, Input } from 'antd';
import styles from './AddUserModal.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { AddUserToGroup } from '../../../../types/services/group';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { groupActions } from '../../../../store/group/group.actions';
import { useAppDispatch } from '../../../../store/hooks';
import { toastService } from '../../../../services/toastMessage/toastMessage';

interface Props {
  visible: boolean;
  changeVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}

const AddUserModal = ({ visible, changeVisible, id }: Props) => {
  const dispatch = useAppDispatch();

  const onSubmit = () => {
    const data = watch();
    dispatch(
      groupActions.addUserToGroup({
        ...data,
        groupId: Number(id),
        index_umk: Number(data.index_umk),
      }),
    ).then(() => toastService.showSuccess('Użytkownik został dodany do grupy'));
  };

  const {
    control,
    watch,
    formState: { errors },
  } = useForm<AddUserToGroup>({
    mode: 'onSubmit',
  });

  const blockButton = Object.values(watch()).some(
    (el: string | number | undefined) => el === '' || el === undefined,
  );

  return (
    <Modal
      title={'Dodaj użytkownika'}
      isVisible={visible}
      onClose={() => changeVisible(false)}
      okText={'Dodaj'}
      closeText='Zamknij'
      onConfirm={() => onSubmit()}
      confirmDisabled={blockButton}
    >
      <Form className={styles.modal} id='add-user'>
        {[
          { name: 'name', placeholder: 'Imię użytkownika' },
          { name: 'surname', placeholder: 'Nazwisko użytkownika' },
          { name: 'password', placeholder: 'Hasło' },
          { name: 'email', placeholder: 'Email' },
          { name: 'index_umk', placeholder: 'Index UMK' },
        ].map(({ name, placeholder }) => (
          <Controller
            key={name}
            name={name as keyof AddUserToGroup}
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <Form.Item className={styles.inputWrapper}>
                {name === 'password' ? (
                  <Input.Password
                    className={styles.input}
                    placeholder={placeholder}
                    value={field.value}
                    onChange={field.onChange}
                    type='password'
                    iconRender={(visible: boolean) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                ) : (
                  <Input
                    className={styles.input}
                    placeholder={placeholder}
                    value={field.value}
                    onChange={field.onChange}
                    type={name === 'name' ? 'email' : 'text'}
                  />
                )}
                {errors[name as keyof AddUserToGroup] && (
                  <span className={styles.errorMessage}>
                    {errors[name as keyof AddUserToGroup]?.message}
                  </span>
                )}
              </Form.Item>
            )}
          />
        ))}
      </Form>
    </Modal>
  );
};

export default AddUserModal;
