/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useReducer, useState } from "react";
import AppReducer from "./AppReducer";
import logger from "./logger";
import UserApi from "../api/UserApi";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [initData, setInitData] = useState([]);
  const [state, dispatch] = useReducer(logger(AppReducer), initData);
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
    // return dispatch({
    //   type: "ADD_USER",
    //   payload: user,
    // });
  };

  const editUser = async (user) => {
    try {
      const res = await UserApi.editData(user, user._id);
      if (res.status === 200) {
        const index = initData.findIndex(user._id === initData._id);
        initData[index] = user;
        setInitData([...initData]);
      }
    } catch (error) {
      console.log(error);
    }
    // return dispatch({
    //   type: "EDIT_USER",
    //   payload: user,
    // });
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
    // return dispatch({
    //   type: "DELETE_USER",
    //   payload: id,
    // });
  };

  return (
    <GlobalContext.Provider
      value={{
        initData,
        addUser,
        editUser,
        deleteUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
