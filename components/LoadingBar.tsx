import styles from "./LoadingBar.module.css";

type Props = {
  color?: string;
  width?: string;
};

export default function LoadingBar({
  color = "#4fa94d",
  width = "200",
}: Props): React.ReactElement {
  return (
    <>
      <div className={styles.backdrop}></div>
      <svg
        className={styles.svg}
        xmlns="http://www.w3.org/2000/svg"
        width={`${width}`}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          marginTop: `${Number(width) * -0.25}`,
          marginLeft: `${Number(width) * -0.5}`,
        }}
        height={`${Number(width) * 0.5}`}
        viewBox={`0 0 ${width} ${Number(200 * 0.5)}`}
        data-testid="infinity-spin"
      >
        <path
          className={styles.path}
          data-testid="infinity-spin-path-1"
          stroke={color}
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
        />
        <path
          data-testid="infinity-spin-path-2"
          opacity="0.07"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
        />
      </svg>
    </>
  );
}
