/* eslint-disable no-unused-vars */
import React, { forwardRef, useContext, useEffect, useRef, useState } from 'react'
import { Button, Form, Schema, DatePicker } from 'rsuite'
import { useNavigate, useLocation } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalState'

const { StringType, NumberType } = Schema.Types
const model = Schema.Model({
    name: StringType()
    .minLength(5, 'This field must be greater than 5.')
    .isRequired('This field is required.'),
    phone: NumberType()
    .isRequired('This field is required.'),
    birthday: StringType()
    .isRequired('This field is required.')
})


const TextField = forwardRef((props, ref) => {
    const { name, label, accepter, error, ...rest} = props
    return (
        <Form.Group controlId={`${name}-4`} ref={ref}>
            <Form.ControlLabel>{label}</Form.ControlLabel>
            <Form.Control name={name} accepter={accepter} errorMessage={error} {...rest}/>
        </Form.Group>
    )
})

const  EditUser = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { users, editUser } = useContext(GlobalContext)

    const [selectedUser, setSelectedUser] = useState({
        id:null,
        name:'',
        phone:'',
        birthday: ''
    })
    const [error, setError] = useState({})
    const formRef = useRef()

    const currentUserId = location.state.data.id;
    console.log(currentUserId);
    useEffect(() => {
        const userId = currentUserId
        const selectedUser = users.find( currentUserTraversal => currentUserTraversal.id === parseInt(userId))

        setSelectedUser(selectedUser)
    }, [currentUserId,users])
    console.log(selectedUser);
    const handleSave = (e) => {
        e.preventDefault();
        console.log(formRef.current.check());
        if(formRef.current.check()){
            editUser(selectedUser)
            navigate(-1)
        }else{
            console.log('Error', error);
        }
    }
    const handleOnChange = (userKey, newValue) => {
        setSelectedUser({ ...selectedUser, [userKey]: newValue})
    }   
    if(!selectedUser || !selectedUser.id){
        return <div>Invalid User ID.</div>
    }
    
    return (
        <div 
        style={{
            display:'flex', 
            justifyContent:'center', 
            }}
        >   
            <div 
            style={{
                display:'flex', 
                justifyContent:'center', 
                border: 'solid 1px #ccc', 
                width: 500, 
                padding:'50px 0', 
                marginTop: 150,
                borderRadius: 13
                }}
            >   
                <Form 
                    model={model} 
                    ref={formRef}
                    onChange={e=>handleOnChange([`${users}`], e.target.value[`${users}`])}
                    onCheck={setError}
                    formDefaultValue={selectedUser}
                    value={selectedUser}
                >
                    <h3 style={{
                        display:'flex',
                        justifyContent:'center',
                        marginBottom: 30
                    }}>
                        User Details
                    </h3>
                    <TextField name='name' label='Name' errorMessage={error.name}/>
                    <TextField name='phone' label='Phone' errorMessage={error.phone}/>
                    <div 
                    className='field' 
                    style={{
                        display:'flex', 
                        flexDirection:'column', 
                        margin:'5px 0'
                        }}
                    >
                        <p>Birthday</p>
                        <DatePicker 
                            oneTap 
                            format='yyyy-MM-dd' 
                            style={{margin: '5px 0'}} 
                            value={new Date(selectedUser.birthday)}
                        />
                    </div>
                    <div 
                        style={{
                            display:'flex', 
                            justifyContent:'space-evenly', 
                            marginTop: 30 
                        }}>
                        <Button 
                        appearance='primary' 
                        onClick={handleSave}
                        style={{
                            borderRadius: 14, 
                            background: 'linear-gradient(130deg, rgba(171,72,221,1) 18%, rgba(4,76,218,1) 75%)', 
                            color: 'white',
                            padding: '8px 18px',
                            width: 80,
                        }}
                        >
                            Save
                        </Button>
                        <Button 
                        appearance='primary' 
                        onClick={() => navigate(-1)}
                        style={{
                            borderRadius: 14, 
                            background: 'linear-gradient(130deg, rgba(61,52,65,1) 18%, rgba(200,208,224,1) 75%)', 
                            color: 'white',
                            padding: '8px 18px',
                            width: 80,
                        }}
                        >
                            Cancel
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default EditUser