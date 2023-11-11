import styles from "./Card.module.scss";

interface Props {
  children: string | JSX.Element | JSX.Element[];
  className?: string;
}

const Card = ({ children, className }: Props) => {
  return <div className={`${styles.card} ${className || ""}`}>{children}</div>;
};

export default Card;
