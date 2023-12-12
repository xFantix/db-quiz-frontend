import { useEffect } from 'react';
import styles from './Questions.module.scss';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { questionActions } from '../../../store/question/question.actions';
import { Collapse, CollapseProps } from 'antd';
import { Question, QuestionType } from '../../../types/services/question';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { toastService } from '../../../services/toastMessage/toastMessage';
import JSONPretty from 'react-json-pretty';

const Questions = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(questionActions.getAllQuestions());
  }, []);

  const removeQuestion = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    id: number,
  ) => {
    e.stopPropagation();
    dispatch(questionActions.removeQuestion(id)).then(() => {
      toastService.showSuccess('Pytanie zostało usuniete');
    });
  };

  const questions = useAppSelector((state) => state.question.questions);

  const items: CollapseProps['items'] = [
    ...questions.map((el: Question, id: number) => ({
      id: id.toString(),
      label: (
        <div className={styles.headerCollapse}>
          <div>{el.questionDescription}</div>
          <FontAwesomeIcon
            onClick={(e) => removeQuestion(e, el.id)}
            icon={faClose}
          />
        </div>
      ),
      children:
        el.questionType === QuestionType.Request ? (
          <p>
            <JSONPretty id='json-pretty' data={el.answer}></JSONPretty>
          </p>
        ) : (
          <p>{el.answer}</p>
        ),
    })),
  ];

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.header}>Pytania</h2>
      <div className={styles.questions}>
        <Collapse items={items} defaultActiveKey={['1']} />
      </div>
    </div>
  );
};

export default Questions;
