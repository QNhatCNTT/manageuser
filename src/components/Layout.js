import React, { useContext } from "react";
import AddUser from "./AddUser";
import SearchInput from "./SearchInput";
import UserTable from "./UserTable";
import { GlobalContext } from "../context/GlobalState";

export default function Layout() {
  const { searchText } = useContext(GlobalContext);
  const onChange = (e) => {
    const inputText = e.target.value.trim().replace(/" "/g, "");
    searchText(inputText);
  };
  return (
    <React.Fragment>
      <div>
        <AddUser />
        <SearchInput placeholder="Search..." onChange={onChange} />
      </div>
      <UserTable />
    </React.Fragment>
  );
}
