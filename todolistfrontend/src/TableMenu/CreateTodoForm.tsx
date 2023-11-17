import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { Button } from 'react-bootstrap';
import { MutableRefObject } from 'react';

interface Props{
  setCreateBtn: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreateTodoForm:React.FC<Props> = ({setCreateBtn}) =>{
  const { Formik } = formik;

  const schema = yup.object().shape({
    title: yup.string().required(),
    content: yup.string().required(),
    done: yup.bool().required(),
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={{
        title: '',
        content: '',
        done: false
      }}
      validateOnMount = {true}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isValid }) =>{ 

          setCreateBtn(isValid ? false : true)
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
              <Form.Group as={Col} md="6" controlId="validationFormik03">
                <Form.Label>Content</Form.Label>
                <Form.Control
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
                onChange={handleChange}
                feedback={errors.done}
                feedbackType="invalid"
                id="validationFormik0"
              />
            </Form.Group>
          </Form>
        )}
      }
    </Formik>
  );
}

export default CreateTodoForm;