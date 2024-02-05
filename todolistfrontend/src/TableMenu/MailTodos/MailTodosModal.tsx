import React, { useState } from 'react'
import axios from 'axios';
import * as yup from 'yup';
import { Button, Modal } from 'react-bootstrap'
import { ITodos } from '../../Data/ITodos';
import { Formik } from 'formik';
import MailTodosForm from './MailTodosForm';

interface Props{
  show:boolean;
  handleClose:()=>void;
  todosList:ITodos[];
}
interface ILogicAppContent {
  TodosList:ITodos[];
  userEmail:string;
}

interface IValues {
  email:string;
}

const MailTodosModal:React.FC<Props> = ({show, handleClose, todosList }) => {
  const [TodoBtnStatus, SetTodoBtnStatus ] = useState(false);
  const [submitAction, setSubmitAction] = useState<()=>void>(()=>{});

  const onSendMailClick = async ()=>{
    submitAction();
    handleClose();
  }

  const Submit = (values:IValues)=>{
    const logicAppContent:ILogicAppContent = {
      TodosList: todosList,
      userEmail: values.email
    }
    axios.post(`${process.env.REACT_APP_LOGIC_APP_END_POINT}`, logicAppContent);
  }
  const schema = yup.object().shape({email:yup.string().required()});
  const initialValues:IValues = {email:""};
  
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>Send todo list</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={schema}
          onSubmit={Submit}
          initialValues={initialValues}
          validateOnMount = {true}
        >
          { Props => <MailTodosForm {...Props} SetTodoBtnStatus={SetTodoBtnStatus} setSubmitAction={setSubmitAction}/>}
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" form='create-form' disabled={TodoBtnStatus}  onClick={onSendMailClick}>
          Send Mail
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default MailTodosModal;