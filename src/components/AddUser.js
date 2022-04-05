import React, { forwardRef, useRef, useState } from 'react'
import { Modal, ButtonToolbar, Button, Form, Schema, FlexboxGrid, MaskedInput, toaster, Message } from 'rsuite'

const { StringType, DateType } = Schema.Types
const model = Schema.Model({
    name: StringType()
    .minLength(5, 'This field must be greater than 5.')
    .isRequired('This field is required.'),
    phone: StringType()
    .isRequired('This field is required.'),
    birthday: DateType()
    .isRequired('This field is required.')
})

const InputMask = forwardRef(({onChange, ...rest}, ref) => (
    <MaskedInput
        {...rest}
        ref={ref}
        className="rs-input"
        onChange={e => {
            onChange(e.target.value);
        }
        }
    />
))

const TextField = forwardRef((props, ref) => {
    const { name, label, accepter, ...rest} = props
    return (
        <Form.Group controlId={`${name}-4`} ref={ref}>
            <Form.ControlLabel>{label}</Form.ControlLabel>
        </Form.Group>
    )
})

const Field = forwardRef((props, ref) => {
    const { name, message, label, accepter, error, ...rest } = props
    return (
        <Form.Group ref={ref} className={ error ? 'has-error' : '' }>
            <Form.ControlLabel>{label}</Form.ControlLabel>
            <Form.Control name={name} accepter={accepter} errorMessage={error}/>
            <Form.HelpText>{message}</Form.HelpText>
        </Form.Group>
    );
})

// const mask = [/[0-9]/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/]
const mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];


const AddUser =() => {

    const [visible, setVisible] = useState(false)
    const formRef = useRef()
    const [formError, setFormError] = useState({})
    const [formValue, setFormValue] = useState({
        phone:''
    })
    
    const showModal = () => {
        setVisible(true)
    }
    const handleCancel = () => {
        setVisible(false)
    }

    const handleSubmit = () => {
        if (!formRef.current.check()) {
          toaster.push(
            <Message showIcon type="error">
              Error
            </Message>
          );
          return;
        }
        toaster.push(
          <Message showIcon type="success">
            Success
          </Message>
        );
      };
    

    return (
        <div className="modal-container">
            <div style={{display:'flex', float:'left',marginBottom:20}}>
                <ButtonToolbar>
                    <Button onClick={showModal} style={{borderRadius: 14, 
                        background: 'linear-gradient(130deg, rgba(171,72,221,1) 18%, rgba(4,76,218,1) 75%)', 
                        color: 'white',
                        padding: '8px 18px',}}> Add User</Button>
                </ButtonToolbar>
            </div>
            <Modal open={visible} onClose={handleCancel}>
                <Modal.Body>
                    <div>
                        <FlexboxGrid>
                            <FlexboxGrid.Item colspan={12}>
                                <Form
                                    ref={formRef}
                                    onChange={setFormValue}
                                    onCheck={setFormError}
                                    formDefaultValue={formValue}
                                    model={model}
                                >
                                    <Field
                                        name='phone'
                                        label='Phone Number'
                                        mask={mask}
                                        accepter={InputMask}
                                        error={formError.phone}
                                    />

                                    <Form.Group>
                                        <Button onClick={handleSubmit} appearance="primary">
                                            Submit
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item colspan={12}>
                                <FlexboxGrid.JSONView formValue={formValue} formError={formError}/>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </div>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button onClick={handleCancel} appearance="primary">
                        Add
                    </Button>
                    <Button onClick={handleCancel} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer> */}
            </Modal>
            
        </div>
    )
}
export default AddUser