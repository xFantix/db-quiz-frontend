import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { groupActions } from "../../store/group/group.actions";
import styles from "./Dashboard.module.scss";
import CustomButton from "@components/common/CustomButton/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import GroupCard from "@components/GroupCard/GroupCard";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(groupActions.getAllGroups());
  }, []);

  const groups = useAppSelector((store) => store.group.groups);

  const { isAdmin } = useAppSelector((store) => store.user.userInformation);

  return (
    <div className={styles.dashboard}>
      {isAdmin && (
        <div className={styles.buttonsWrapper}>
          <CustomButton onClick={() => {}}>
            <div className={styles.button}>
              <FontAwesomeIcon icon={faPlus} />
              <span>Dodaj grupę</span>
            </div>
          </CustomButton>
          <CustomButton onClick={() => {}}>
            <div className={styles.button}>
              <FontAwesomeIcon icon={faTrash} />
              <span>Usuń grupę</span>
            </div>
          </CustomButton>
          <CustomButton onClick={() => {}}>
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
            <GroupCard
              key={group.id}
              name={group.name}
              membersCount={group.users.length}
              startDate={group.startTimeQuiz}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
