import * as moment from 'moment'
import React, { forwardRef, useRef, useState, useContext } from 'react'
import { Modal, ButtonToolbar, Button, Form, Schema, DatePicker } from 'rsuite'
import {GlobalContext} from '../context/GlobalState'


const { StringType, DateType, NumberType } = Schema.Types
const model = Schema.Model({
    name: StringType()
    .minLength(5, 'This field must be greater than 5.')
    .isRequired('This field is required.'),
    phone: NumberType()
    .isRequired('This field is required.'),
    birthday: DateType()
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
    const { addUser, users } = useContext(GlobalContext)
    // console.log(users);
    const [visible, setVisible] = useState(false)
    const [error, setError] =useState({})
    const [formValue, setFormValue] = useState({
        name:'',
        phone: '',
        birthday: null
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
            name: formValue.name,
            phone: formValue.phone,
            birthday:  moment(new Date(formValue.birthday)).format("YYYY-MM-DD")
        }
        // console.log(formRef.current.check());
        if(!formRef.current.check()){
            console.log('error', error);
            setVisible(true)
        }else{
            addUser(newUser)
            setVisible(false)
            console.log('formValue', formValue);
            console.log(newUser);
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
            <Modal open={visible} onClose={handleCancel} style={{backgroundColor:'GhostWhite'}}>
                <Modal.Body>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <Form 
                            model={model} 
                            ref={formRef}
                            onChange={setFormValue}
                            onCheck={setError}
                            formValue={ formValue ||  Date(formValue).toLocaleDateString()}
                        >
                            <h4 style={{
                                display:'flex',
                                justifyContent:'center',
                                marginBottom: 30
                            }}>
                                New User
                            </h4>
                            <TextField 
                                name='name' 
                                label='Name' 
                                placeholder='Enter your name' 
                                errorMessage={error.name} 
                            />
                            <TextField 
                                name='phone' 
                                label='Phone' 
                                placeholder='Enter your phone' 
                                errorMessage={error.phone} 
                            />
                            <TextField 
                                name='birthday' 
                                label='BirthDay' 
                                placeholder='Choose Date Of Birth' 
                                oneTap
                                format='yyyy-MM-dd'
                                errorMessage={error.birthday} 
                                accepter={DatePicker} 
                                style={{margin: '5px 0', width: 300}} 
                            />
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
                                    background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)', 
                                    color: 'black',
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