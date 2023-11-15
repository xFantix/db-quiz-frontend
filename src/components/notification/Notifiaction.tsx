import { ReactNode } from "react";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  title: string;
  message: ReactNode;
  undo?: () => void;
}

const Notification = ({ title, message, undo }: Props) => {
  return (
    <>
      <h3>
        <strong>{title}</strong>
      </h3>
      <p>{message}</p>
      {undo && (
        <span onClick={undo}>
          {" "}
          <u>UNDO</u>
        </span>
      )}
    </>
  );
};

export default Notification;
