import styles from "./PageError.module.css";

export default function PageError({ message }: { message: string }) {
  return (
    <div className={styles.div}>
      <p>{message}</p>
    </div>
  );
}
