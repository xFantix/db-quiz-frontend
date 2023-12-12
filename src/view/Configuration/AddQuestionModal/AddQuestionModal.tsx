import Modal from '@components/common/Modal/Modal';
import { Controller, useForm } from 'react-hook-form';
import { Question, QuestionType } from '../../../types/services/question';
import styles from './AddQuestionModal.module.scss';
import { Form, Input, Radio } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useAppDispatch } from '../../../store/hooks';
import { questionActions } from '../../../store/question/question.actions';
import { toastService } from '../../../services/toastMessage/toastMessage';

interface Props {
  visible: boolean;
  changeVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const options = [
  { label: 'Zapytanie', value: QuestionType.Request },
  { label: 'Otwarte', value: QuestionType.Open },
];

const AddQuestionModal = ({ visible, changeVisible }: Props) => {
  const { control, watch } = useForm<Question>({
    mode: 'onSubmit',
    defaultValues: {
      answer: '',
      questionDescription: '',
      questionType: QuestionType.Request,
    },
  });

  const dispatch = useAppDispatch();

  const onSubmit = () => {
    const data = watch();
    const parseAnswer = data.answer.replace(/(\n\n?)\n+/g, '');
    dispatch(
      questionActions.createQuestion({ ...data, answer: parseAnswer }),
    ).then(() => {
      toastService.showSuccess('Pytanie zostało dodane');
    });
  };

  return (
    <Modal
      title={'Dodaj pytanie'}
      isVisible={visible}
      onClose={() => changeVisible(false)}
      okText={'Dodaj'}
      closeText='Zamknij'
      onConfirm={() => {
        onSubmit();
      }}
    >
      <Form className={styles.modal} id='add-user'>
        <Controller
          name={'questionDescription'}
          control={control}
          render={({ field }) => (
            <Form.Item className={styles.inputWrapper}>
              <Input
                className={styles.input}
                placeholder='Treść pytania'
                value={field.value}
                onChange={field.onChange}
              />
            </Form.Item>
          )}
        />
        <Controller
          name={'questionType'}
          control={control}
          render={({ field }) => (
            <Form.Item className={styles.inputWrapper}>
              <Radio.Group
                options={options}
                onChange={field.onChange}
                value={field.value}
              />
            </Form.Item>
          )}
        />
        <Controller
          name={'answer'}
          control={control}
          render={({ field }) => (
            <Form.Item className={styles.inputWrapper}>
              <TextArea
                className={styles.textArea}
                placeholder='Odpowiedz'
                value={field.value}
                onChange={field.onChange}
              />
            </Form.Item>
          )}
        />
      </Form>
    </Modal>
  );
};

export default AddQuestionModal;
