import React from "react";
import AddUser from "./AddUser";
import SearchInput from "./SearchInput";
import UserTable from "./UserTable";

export default function Layout() {
  return (
    <React.Fragment>
      <div>
        <AddUser />
        <SearchInput placeholder="Search..." />
      </div>
      <UserTable />
    </React.Fragment>
  );
}
