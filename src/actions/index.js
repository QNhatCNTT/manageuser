import { ADDUSER, EDITUSER, DELETEUSER } from '../constants/index'

export const addUser = payload => {
    return {
        type: ADDUSER,
        payload
    }
}

export const editUser = payload => {
    return {
        type: EDITUSER,
        payload
    }
}

export const deleteUser = payload => {
    return {
        type: DELETEUSER,
        payload
    }
}