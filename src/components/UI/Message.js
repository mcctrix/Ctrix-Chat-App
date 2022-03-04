import { useContext } from "react";
import AppContext from "../GlobalStore/Context";
import styles from "../../styles/Message.module.css";

const Message = (props) => {
  const context = useContext(AppContext);
  return (
    <p
      className={`${
        context.Current_UserID === props.data.Sender && styles.msgalignright
      } ${styles.message}`}
      key={props.data.id}
    >
      {props.data.text}
    </p>
  );
};

export default Message;
