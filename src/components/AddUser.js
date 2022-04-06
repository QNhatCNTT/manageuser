import React, { forwardRef, useRef, useState, useContext } from 'react'
import { Modal, ButtonToolbar, Button, Form, Schema, DatePicker } from 'rsuite'
import {GlobalContext} from '../context/GlobalState'
import { initialState } from '../reducers/index'
// import * as moment from 'moment'

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

const AddUser =() => {
    const formRef = useRef()
    const { setUser, addUser, users } = useContext(GlobalContext)
    console.log(users);
    const [visible, setVisible] = useState(false)
    const [error, setError] =useState({})
    const [value, setValue] = useState({
        // id: 0,
        name:'',
        phone:'',
        birthday: Date()
    })

    const showModal = () => {
        setVisible(true)
    }
    const handleCancel = () => {
        setVisible(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            id: users.length + 1,
            name: value.name,
            phone: value.phone,
            birthday: Date(value.birthday)
        }
        console.log(Date(value.birthday));
        // console.log(formRef.current.check());
        if(!formRef.current.check()){
            console.log('error', error);
            setVisible(true)
        }else{
            addUser(newUser)
            setUser(initialState)
            setVisible(false)
            console.log('value', value);
        }
    }
    

    return (
        <div>
            <div style={{display:'flex', float:'left',marginBottom:20}}>
                <ButtonToolbar>
                    <Button onClick={showModal} 
                    style={{
                        borderRadius: 14, 
                        background: 'linear-gradient(130deg, rgba(171,72,221,1) 18%, rgba(4,76,218,1) 75%)', 
                        color: 'white',
                        padding: '8px 18px',
                        }}
                    > 
                        Add User
                    </Button>
                </ButtonToolbar>
            </div>
            <Modal open={visible} onClose={handleCancel}>
                <Modal.Body>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <Form 
                            model={model} 
                            ref={formRef}
                            onChange={setValue}
                            onCheck={setError}
                            formDefaultValue={value}
                        >
                            <TextField name='name' label='Name' placeholder='Enter your name' errorMessage={error.name}/>
                            <TextField name='phone' label='Phone' placeholder='Enter your phone' errorMessage={error.phone}/>
                            <div className='field' style={{display:'flex', flexDirection:'column', margin:'5px 0'}}>
                                <p>Birthday</p>
                                <DatePicker 
                                    oneTap 
                                    format='yyyy-MM-dd' 
                                    style={{margin: '5px 0'}}
                                    placeholder='Choose Date'
                                />
                            </div>
                            <div style={{display:'flex', justifyContent:'space-evenly', marginTop: 30 }}>
                                <Button 
                                appearance='primary'
                                onClick={handleSubmit} 
                                style={{
                                    borderRadius: 14, 
                                    background: 'linear-gradient(130deg, rgba(171,72,221,1) 18%, rgba(4,76,218,1) 75%)', 
                                    color: 'white',
                                    padding: '8px 18px',
                                    width: 80
                                }}
                                >
                                    Add
                                </Button>
                                <Button 
                                appearance='primary'
                                onClick={handleCancel} 
                                style={{
                                    borderRadius: 14, 
                                    background: 'linear-gradient(130deg, rgba(61,52,65,1) 18%, rgba(200,208,224,1) 75%)', 
                                    color: 'white',
                                    padding: '8px 18px',
                                    width: 80
                                }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
            
        </div>
    )
}
export default AddUser