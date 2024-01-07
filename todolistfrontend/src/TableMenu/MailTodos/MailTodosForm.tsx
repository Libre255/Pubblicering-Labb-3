import React, { useEffect } from 'react'
import * as formik from 'formik';
import { Col, Form, Row } from 'react-bootstrap';

interface Props extends formik.FormikProps<{email:string}>{
  SetTodoBtnStatus: React.Dispatch<React.SetStateAction<boolean>>
  setSubmitAction: React.Dispatch<React.SetStateAction<() => void>>
}

const MailTodosForm:React.FC<Props> = (Props) => {
  const { handleSubmit, handleChange, values, errors, SetTodoBtnStatus, setSubmitAction, isValid } = Props;

  useEffect(()=>{
    setSubmitAction(()=>handleSubmit);
  }, [handleSubmit, setSubmitAction]);

  useEffect(()=>{
    SetTodoBtnStatus(isValid ? false : true);
  }, [isValid, SetTodoBtnStatus]);

  return (
    <Form noValidate onSubmit={handleSubmit} id='create-form'>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationFormik01">
          <Form.Label>Insert Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={values.email}
            onChange={handleChange}
            isValid={!errors.email}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    </Form>
  )
}

export default MailTodosForm;