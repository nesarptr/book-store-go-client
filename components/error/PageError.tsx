import styles from "./PageError.module.css";

export default function PageError({ status }: { status: string }) {
  return (
    <div className={styles.div}>
      <p>{status}</p>
      <p>something went wrong</p>
    </div>
  );
}
