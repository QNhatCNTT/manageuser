/* eslint-disable no-unused-vars */
import React, { createContext, useReducer } from "react"
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

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(logger(AppReducer), initialState)

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
                users: state.users,
                addUser,
                editUser,
                deleteUser
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}