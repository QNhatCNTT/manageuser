import { SETUSER, ADDUSER, EDITUSER, DELETEUSER } from '../constants/index'

export const initialState = {
    user:{
        name:'',
        phone:'',
        birthday:''
    },
    users: []
}

const reducer = (state, action) => {
    switch(action.type){
        case SETUSER:
            return {
                ...state,
                user: action.payload
            }
        case ADDUSER:
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        case EDITUSER:
            const updateUser = action.payload
            const updateUsers = state.users.map(user => {
                if(user.id === updateUser.id){
                    return updateUser
                }
                return user;
            })

            return {
                ...state,
                users: updateUsers
            }
        
        case DELETEUSER:
            return {
                ...state,
                users: state.users.filter(
                    (user) => user.id !== action.payload
                )
            }
        
        default:
            throw new Error('Invalid action.')
    }
}

export default reducer