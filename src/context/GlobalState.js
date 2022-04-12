/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from "react";
import UserApi from "../api/UserApi";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [initData, setInitData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [foundData, setFoundData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await UserApi.getData();
        const data = await res.data;
        setInitData(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
    fetchData();
  }, []);

  const addUser = async (user) => {
    try {
      const res = await UserApi.addData(user);
      const data = res.data;
      if (res.status === 200) {
        setInitData([...initData, data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editUser = async (user) => {
    try {
      const res = await UserApi.editData(user, user._id);
      if (res.status === 200) {
        const index = initData.findIndex((data) => data._id === user._id);
        initData[index] = user;
        setInitData([...initData]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await UserApi.removeData(id);
      if (res.status === 200) {
        const newData = initData.filter((user) => user._id !== id);
        setInitData([...newData]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchText = (text) => {
    const value = text.toLowerCase();
    if (value.length > 0) {
      setIsSearch(true);
      const data = initData.filter((user) => {
        try {
          return (
            user.name.toLowerCase().search(value) !== -1 ||
            user.phone.toString().toLowerCase().search(value) !== -1
          );
        } catch (error) {
          return [];
        }
      });
      setFoundData(data);
    } else {
      setIsSearch(false);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        initData,
        foundData,
        isSearch,
        addUser,
        editUser,
        deleteUser,
        searchText,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
