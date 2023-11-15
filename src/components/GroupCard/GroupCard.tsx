import styles from "./GroupCard.module.scss";
import Background from "@assets/graphics/backgroundCard.svg";
import { faCalendarDays, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image } from "antd";
import { format } from "date-fns";

interface Props {
  name: string;
  membersCount: number;
  startDate: string;
}

const GroupCard = ({ name, membersCount, startDate }: Props) => {
  return (
    <div className={styles.groupCard}>
      <div className={styles.top}>
        <Image preview={false} className={styles.image} src={Background} />
        <div className={styles.tagMembers}>
          <FontAwesomeIcon icon={faUser} />
          {membersCount}
        </div>
        <div className={styles.tagStart}>
          <FontAwesomeIcon icon={faCalendarDays} />
          {format(new Date(startDate), "dd-MM-yyyy HH:mm")}
        </div>
      </div>
      <div className={styles.bottom}>
        <h2 className={styles.groupName}>{name}</h2>
      </div>
    </div>
  );
};

export default GroupCard;
