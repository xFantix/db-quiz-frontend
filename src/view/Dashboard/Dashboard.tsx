import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { groupActions } from "../../store/group/group.actions";
import styles from "./Dashboard.module.scss";
import CustomButton from "@components/common/CustomButton/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faPlus } from "@fortawesome/free-solid-svg-icons";
import GroupCard from "@components/GroupCard/GroupCard";
import CreateGroupModal from "./CreateGroupModal/CreateGroupModal";
import AddUsersFromFileModal from "./AddUsersFromFileModal/AddUsersFromFileModal";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const [addGroup, setAddGroup] = useState(false);
  const [addUsersFile, setAddUsersFile] = useState(false);

  useEffect(() => {
    dispatch(groupActions.getAllGroups());
  }, []);

  const groups = useAppSelector((store) => store.group.groups);

  const { isAdmin } = useAppSelector((store) => store.user.userInformation);

  return (
    <div className={styles.dashboard}>
      {isAdmin && (
        <div className={styles.buttonsWrapper}>
          <CustomButton onClick={() => setAddGroup(true)}>
            <div className={styles.button}>
              <FontAwesomeIcon icon={faPlus} />
              <span>Dodaj grupę</span>
            </div>
          </CustomButton>
          <CustomButton onClick={() => setAddUsersFile(true)}>
            <div className={styles.button}>
              <FontAwesomeIcon icon={faFile} />
              <span>Dodaj użytkowników z pliku</span>
            </div>
          </CustomButton>
        </div>
      )}
      {!!groups.length && (
        <div className={styles.groups}>
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      )}
      <CreateGroupModal visible={addGroup} changeVisible={setAddGroup} />
      <AddUsersFromFileModal
        visible={addUsersFile}
        changeVisible={setAddUsersFile}
      />
    </div>
  );
};

export default Dashboard;
