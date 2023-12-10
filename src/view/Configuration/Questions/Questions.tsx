import { useEffect } from 'react';
import styles from './Questions.module.scss';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { questionActions } from '../../../store/question/question.actions';

const Questions = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(questionActions.getAllQuestions());
  }, []);

  const questions = useAppSelector((state) => state.question.questions);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.header}>Pytania</h2>
      <div className={styles.questions}>
        {questions.map((question) => (
          <div className={styles.question}>{question.questionDescription}</div>
        ))}
      </div>
    </div>
  );
};

export default Questions;
