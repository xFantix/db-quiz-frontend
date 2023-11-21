import Modal from "@components/common/Modal/Modal";

import { DatePicker, Form, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import styles from "./CreateGroupModal.module.scss";
import { AddGroupData } from "../../../types/services/group";
import { useAppDispatch } from "../../../store/hooks";
import { groupActions } from "../../../store/group/group.actions";
import { toastService } from "../../../services/toastMessage/toastMessage";

const { RangePicker } = DatePicker;

interface Props {
  visible: boolean;
  changeVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateGroupModal = ({ visible, changeVisible }: Props) => {
  const { control, watch, setValue } = useForm<AddGroupData>({
    mode: "onSubmit",
  });

  const onChangeDate = (_: any, dateString: [string, string] | string) => {
    setValue("startTimeQuiz", dateString[0]);
    setValue("endTimeQuiz", dateString[1]);
  };

  const name = watch("name");
  const startTimeQuiz = watch("startTimeQuiz");
  const endTimeQuiz = watch("endTimeQuiz");

  const dispatch = useAppDispatch();

  const onSubmit = () => {
    dispatch(
      groupActions.addGroup({
        name,
        startTimeQuiz: new Date(startTimeQuiz).toISOString(),
        endTimeQuiz: new Date(endTimeQuiz).toISOString(),
      })
    ).finally(() => {
      toastService.showSuccess("Grupa została dodana");
    });
  };

  const disableButton = !name || !startTimeQuiz || !endTimeQuiz;

  return (
    <Modal
      title={"Tworzenie grupy"}
      isVisible={visible}
      onClose={() => changeVisible(false)}
      confirmDisabled={disableButton}
      okText={"Dodaj"}
      closeText="Zamknij"
      onConfirm={() => {
        onSubmit();
      }}
    >
      <Form className={styles.modal} id="create group">
        <Controller
          name={"name"}
          control={control}
          render={({ field }) => (
            <Form.Item className={styles.inputWrapper}>
              <Input
                className={styles.input}
                placeholder="Nazwa grupy"
                value={field.value}
                onChange={field.onChange}
              />
            </Form.Item>
          )}
        />

        <Form.Item className={styles.inputWrapper}>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
            placeholder={["Data rozpoczęcia", "Data zakończenia"]}
            onChange={onChangeDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateGroupModal;
