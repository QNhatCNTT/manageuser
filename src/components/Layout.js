import React from "react";
import AddUser from "./AddUser";
import UserTable from "./UserTable";

export default function Layout() {
  return (
    <React.Fragment>
      <AddUser />
      <UserTable />
    </React.Fragment>
  );
}
