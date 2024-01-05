import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import FormFormikConfig from './FormFormikConfig';
import useTodos from '../Hooks/useTodos';

interface Props{
  show:boolean;
  handleClose:()=>void;
  settoggleForUpdate:React.Dispatch<React.SetStateAction<boolean>>
}

export const CreateModal:React.FC<Props> = ({show, handleClose, settoggleForUpdate}) => {
  const [CreateBtnStatus, SetCreateBtnStatus ] = useState(false);
  const [submitAction, setSubmitAction] = useState<()=>void>(()=>{});

  const OnCreateClick = ()=> {
    submitAction();
    handleClose();
    settoggleForUpdate((prevalue)=>!prevalue);
  }

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create a todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormFormikConfig CreateBtnStatus={SetCreateBtnStatus} setSubmitAction={setSubmitAction}/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" form='create-form' disabled={CreateBtnStatus} onClick={OnCreateClick}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
