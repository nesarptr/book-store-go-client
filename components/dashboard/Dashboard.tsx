import React from "react";
import Table from "../Table";

export default function Dashboard() {
  return (
    <>
      <aside>
        <ul>
          <li>Add Projuct</li>
          <li>Manage Product</li>
          <li>My Orders</li>
        </ul>
      </aside>
      <Table />
    </>
  );
}
