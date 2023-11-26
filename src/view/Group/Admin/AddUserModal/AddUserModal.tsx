import Modal from '@components/common/Modal/Modal';
import { Form, Input, Select } from 'antd';
import styles from './AddUserModal.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { AddUserToGroup } from '../../../../types/services/group';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { groupActions } from '../../../../store/group/group.actions';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { toastService } from '../../../../services/toastMessage/toastMessage';
import { AddUserType } from '../../../../types/Group.types';
import { useEffect, useState } from 'react';
import CustomButton from '@components/common/CustomButton/CustomButton';
import { userActions } from '../../../../store/user/user.actions';

interface Props {
  visible: boolean;
  changeVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}

const AddUserModal = ({ visible, changeVisible, id }: Props) => {
  const dispatch = useAppDispatch();
  const [type, setType] = useState<AddUserType>(AddUserType.NEW_USER);

  useEffect(() => {
    dispatch(userActions.getAllUsers());
  }, []);

  const onSubmit = () => {
    const data = watch();
    if (type === AddUserType.NEW_USER) {
      return dispatch(
        groupActions.addUserToGroup({
          ...data,
          groupId: Number(id),
          index_umk: Number(data.index_umk),
        }),
      ).finally(() =>
        toastService.showSuccess('Użytkownik został dodany do grupy'),
      );
    }

    if (data?.userId) {
      dispatch(
        groupActions.changeUserData({ id: data.userId, groupId: Number(id) }),
      );
    }
  };

  const {
    control,
    watch,

    formState: { errors },
  } = useForm<AddUserToGroup>({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      name: '',
      password: '',
      surname: '',
    },
  });

  const blockButton =
    type === AddUserType.NEW_USER
      ? Object.values(watch()).some(
          (el: string | number | undefined) => el === '' || el === undefined,
        )
      : false;

  const users = [...useAppSelector((store) => store.user.allUsers)]
    .filter((el) => el.groupId === null)
    .map((el) => ({
      value: el.id,
      label: `${el.name} ${el.surname}`,
    }));

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
        <div className={styles.buttonWrapper}>
          <CustomButton onClick={() => setType(AddUserType.NEW_USER)}>
            Nowy użytkownik
          </CustomButton>
          <CustomButton onClick={() => setType(AddUserType.UPDATE_USER)}>
            Przypisz użytkownika
          </CustomButton>
        </div>
        {type === AddUserType.NEW_USER ? (
          [
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
          ))
        ) : (
          <Controller
            name={'userId' as keyof AddUserToGroup}
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <Select
                showSearch
                style={{ width: 450 }}
                placeholder='Search to Select'
                optionFilterProp='children'
                options={users}
                value={field.value}
                className={styles.input}
                onChange={field.onChange}
                filterOption={(input: string, option) =>
                  ((option?.label ?? '') as string).includes(input)
                }
                filterSort={(optionA, optionB) =>
                  ((optionA?.label ?? '') as string)
                    .toLowerCase()
                    .localeCompare(
                      ((optionB?.label ?? '') as string).toLowerCase(),
                    )
                }
              />
            )}
          />
        )}
      </Form>
    </Modal>
  );
};

export default AddUserModal;
