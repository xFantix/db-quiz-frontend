import Card from '@components/common/Card/Card';
import styles from './Login.module.scss';
import Logo from '@assets/graphics/logo-umk.png';
import { Button, Form, Image, Input } from 'antd';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from './loginSchema';
import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { userActions } from '../../store/user/user.actions';

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(loginSchema),
    mode: 'onSubmit',
  });

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    setIsLoading(true);
    Promise.resolve(dispatch(userActions.loginUser(data))).finally(() => {
      setIsLoading(false);
    });
  };

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={styles.wrapper}>
      <Card className={styles.loginCard}>
        <Image className={styles.logo} src={Logo} alt='logo' preview={false} />
        <h2 className={styles.header}>Logowanie</h2>
        <Form onFinish={handleSubmit(onSubmit)} id='login'>
          <Controller
            name={'email'}
            control={control}
            render={({ field }) => (
              <Form.Item className={styles.inputWrapper}>
                <Input
                  className={styles.input}
                  placeholder='Email'
                  value={field.value}
                  onChange={field.onChange}
                />
                {errors.email && (
                  <span className={styles.errorMessage}>
                    {errors.email.message}
                  </span>
                )}
              </Form.Item>
            )}
          />
          <Controller
            name={'password'}
            control={control}
            render={({ field }) => (
              <Form.Item className={styles.inputWrapper}>
                <Input
                  className={styles.input}
                  placeholder='Hasło'
                  type='password'
                  value={field.value}
                  onChange={field.onChange}
                />
                {errors.password && (
                  <span className={styles.errorMessage}>
                    {errors.password.message}
                  </span>
                )}
              </Form.Item>
            )}
          />

          <Button
            loading={isLoading}
            className={styles.submitButton}
            htmlType='submit'
          >
            Zaloguj
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
