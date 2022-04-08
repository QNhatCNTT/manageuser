/* eslint-disable no-unused-vars */
import axios from "axios"
import React, { createContext, useEffect, useReducer, useState } from "react"
import { getApiUsers } from "../api/apiUser"
import AppReducer from './AppReducer'
import logger from './logger'

const initialState = {
    users: [
        {
            id: 1,
            name:'Nguyen Van A',
            phone: 123456789,
            birthday:'2001-02-12'
        }
    ]
}

export const GlobalContext = createContext()

export const GlobalProvider = ({children}) => {
    const [initData, setInitData] = useState([])
    const [state, dispatch] = useReducer(logger(AppReducer), initData)
    const baseUrl= "http://192.168.9.20:5000/api/users"
    useEffect( ()=>{
        axios.get(baseUrl)
        .then(function(response){
          const data = response.data.result;
          console.log(typeof data);
          console.log(data);
          setInitData(data)
        })
        .catch(function(error){
          console.log(error)
        })

        // const data = getApiUsers()
        // console.log(data);
      },[])
    
    const addUser = user => {
        dispatch({
            type: 'ADD_USER',
            payload: user
        })
    }
    const editUser = user => {
        dispatch({
            type: 'EDIT_USER',
            payload: user
        })
    }
    const deleteUser = id => {
        dispatch({
            type: 'DELETE_USER',
            payload: id
        })
    }

    return (
        <GlobalContext.Provider
            value={{
                initData,
                addUser,
                editUser,
                deleteUser
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}