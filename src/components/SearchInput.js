import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Input, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";

function SearchInput({ placeholder, ...props }) {
  const styles = {
    marginBottom: 10,
    width: 400,
    float: "right",
  };
  const { searchText } = useContext(GlobalContext);
  const onChange = (e) => {
    const inputText = e.trim().replace(/" "/g, "");
    searchText(inputText);
  };
  return (
    <InputGroup {...props} inside style={styles}>
      <Input placeholder={placeholder} onChange={onChange} />
      <InputGroup.Addon>
        <SearchIcon />
      </InputGroup.Addon>
    </InputGroup>
  );
}

export default SearchInput;
