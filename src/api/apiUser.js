import API from './api'

const getApiUsers = async () => {
    const res = await API.get()
    return res.data
}

const postApiUser = async (params) => {
    const res = await API.post(params)
    return res.data
}

const putApiUser = async (params) => {
    const res = await API.put(params)
    return res.data
}

const deleteApiUser = async (userId) => {
    const res = await API.delete(`/${userId}`)
    return res.data
}

export {
    getApiUsers, 
    postApiUser, 
    putApiUser, 
    deleteApiUser
}