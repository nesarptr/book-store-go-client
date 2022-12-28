import React from "react";

import styles from "./table.module.css";

type TableProps = {
  data?: [];
  columns?: string[];
  hover?: boolean;
  striped?: boolean;
};

export default function Table({
  data = [],
  columns = [],
  hover = true,
  striped = true,
}: TableProps) {
  const getCaps = (head: string) => {
    return head.toUpperCase();
  };
  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns &&
              columns.map((head) => (
                <th className={styles.th} key={head}>
                  {getCaps(head)}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((row) => (
              <tr
                className={`${hover && "hover"} ${striped && "striped"}`}
                key={row}
              >
                {columns.map((col) => (
                  <td className={styles.td} key={col}>
                    {row[col]}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      {data ? null : <p>No Row to show :)</p>}
    </div>
  );
}
