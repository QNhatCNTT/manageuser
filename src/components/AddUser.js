import React, { forwardRef, useState } from 'react'
import { Modal, ButtonToolbar, Button, Form, Schema, DatePicker } from 'rsuite'

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
    const { name, label, accepter, ...rest} = props
    return (
        <Form.Group controlId={`${name}-4`} ref={ref}>
            <Form.ControlLabel>{label}</Form.ControlLabel>
            <Form.Control name={name} accepter={accepter} {...rest}/>
        </Form.Group>
    )
})

const AddUser =() => {

    const [visible, setVisible] = useState(false)
    const showModal = () => {
        setVisible(true)
    }
    const handleCancel = () => {
        setVisible(false)
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
                        <Form model={model}>
                            <TextField name='name' label='Name' />
                            <TextField name='phone' label='Phone'/>
                            <div className='field' style={{display:'flex', flexDirection:'column', margin:'5px 0'}}>
                                <p>Birthday</p>
                                <DatePicker oneTap format='dd-MM-yyyy' style={{margin: '5px 0'}} />
                            </div>
                            <div style={{display:'flex', justifyContent:'center', marginTop: 30 }}>
                                <Button 
                                appearance='primary' 
                                type='submit' 
                                style={{
                                    borderRadius: 14, 
                                    background: 'linear-gradient(130deg, rgba(171,72,221,1) 18%, rgba(4,76,218,1) 75%)', 
                                    color: 'white',
                                    padding: '8px 18px',
                                }}
                                >
                                    Submit
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