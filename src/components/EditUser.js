import React, { forwardRef, useRef, useState } from 'react'
import { Button, Form, Schema, DatePicker } from 'rsuite'
import { useNavigate, useLocation } from 'react-router-dom'

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
    const [value, setValue] = useState({
        // id: location.state.data['id'],
        name: location.state.data['name'],
        phone: location.state.data['phone'],
        birthday: Date(location.state.data['birthday'])
    })
    console.log(value);
    const [error, setError] = useState({})
    const formRef = useRef()
    const handleSave = () => {
        console.log(formRef.current.check());
        if(formRef.current.check()){
            navigate(-1)
        }else{
            console.log('Error', error);
        }
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
                    onChange={setValue}
                    onCheck={setError}
                    formDefaultValue={value}
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
                            defaultValue={Date(value.birthday)}
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