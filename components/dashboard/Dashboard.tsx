import React from "react";
import Table from "../Table";

export default function Dashboard() {
  return (
    <>
      <aside>
        <ul>
          <li>Add Book</li>
          <li>Manage Book</li>
          <li>My Orders</li>
        </ul>
      </aside>
      <Table />
    </>
  );
}
