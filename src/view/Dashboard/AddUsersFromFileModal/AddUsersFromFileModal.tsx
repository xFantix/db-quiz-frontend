import Modal from "@components/common/Modal/Modal";
import styles from "./AddUsersFromFileModal.module.scss";
import { Form } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { groupActions } from "../../../store/group/group.actions";
import { toastService } from "../../../services/toastMessage/toastMessage";

interface Props {
  visible: boolean;
  changeVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddUsersFromFileModal = ({ visible, changeVisible }: Props) => {
  const [file, setFile] = useState<File | null>();

  const dispatch = useAppDispatch();

  const onSubmit = async () => {
    const formData = new FormData();

    if (file && file.type === "text/csv") {
      Promise.resolve(formData.append("file", file)).then(() => {
        dispatch(groupActions.addUsersFromFile(formData)).then(() => {
          toastService.showSuccess("Dodano użytkownikow");
        });
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setFile(files?.item(0));
  };

  return (
    <Modal
      title={"Dodanie użytkowników z pliku"}
      isVisible={visible}
      onClose={() => changeVisible(false)}
      okText={"Dodaj"}
      closeText="Zamknij"
      onConfirm={() => {
        onSubmit();
      }}
    >
      <Form className={styles.modal}>
        <div className={styles.buttonWrapper}>
          <input
            onChange={(e) => handleFileChange(e)}
            type="file"
            name="attachments"
            id="attachments"
            className={styles.input}
          />

          <label htmlFor={"attachments"} className={styles.label}>
            <FontAwesomeIcon icon={faLink} />
            <span>Dodaj plik</span>
          </label>
          <span>Max 25 MB</span>
        </div>
      </Form>
    </Modal>
  );
};

export default AddUsersFromFileModal;
