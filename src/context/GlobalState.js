/* eslint-disable no-unused-vars */
import React, { createContext, useReducer } from "react"
// import { addUser,editUser,deleteUser } from '../actions/index'
import reducer, { initialState } from '../reducers/index'

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const setUser = user => {
        dispatch({
            type: 'set_user',
            payload: user
        })
    }

    const addUser = user => {
        dispatch({
            type: 'add_user',
            payload: user
        })
    }
    const editUser = user => {
        dispatch({
            type: 'edit_user',
            payload: user
        })
    }
    const deleteUser = id => {
        dispatch({
            type: 'delete_user',
            payload: id
        })
    }

    return (
        <GlobalContext.Provider
            value={{
                users: state.users,
                setUser,
                addUser,
                editUser,
                deleteUser
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}