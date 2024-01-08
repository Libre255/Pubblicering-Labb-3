import React, { useEffect } from 'react'
import * as formik from 'formik';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { ITodos } from '../../Data/ITodos';

interface Props extends formik.FormikProps<ITodos> {
  SetEditBtnStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setSubmitAction: React.Dispatch<React.SetStateAction<(() => void)>>;
}

const EditFormInput: React.FC<Props> = (Props) => {
  const { handleSubmit, handleChange, values, errors, isValid, SetEditBtnStatus, setSubmitAction, setFieldValue } = Props;

  useEffect(()=>{
    setSubmitAction(()=>handleSubmit);
  }, [handleSubmit, setSubmitAction]);

  useEffect(()=>{
    SetEditBtnStatus(isValid ? false : true);
  }, [isValid, SetEditBtnStatus]);

  return (
    <Form noValidate onSubmit={handleSubmit} id='create-form'>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationFormik01">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            isValid={!errors.title}
            isInvalid={!!errors.title}
          />
          <Form.Control.Feedback type="invalid">
            {errors.content}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationFormik03">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            type="text"
            placeholder="Content"
            name="content"
            value={values.content}
            onChange={handleChange}
            isInvalid={!!errors.content}
            isValid={!errors.content}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {errors.content}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          name="terms"
          label="is this task done?"
          checked={values.done}
          onChange={()=> setFieldValue("done", !values.done)}
          feedback={errors.done}
          feedbackType="invalid"
          id="validationFormik0"
        />
      </Form.Group>
    </Form>
  )
}

export default EditFormInput;
