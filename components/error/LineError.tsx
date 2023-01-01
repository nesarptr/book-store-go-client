import styles from "./LineError.module.css";

export default function LineError({ message }: { message: string }) {
  return <p className={styles.er}>{message}</p>;
}
