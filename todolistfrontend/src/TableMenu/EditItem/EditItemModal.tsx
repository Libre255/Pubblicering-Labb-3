import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import EditFormFormikConfig from './EditFormFormikConfig';
import { ITodos } from '../../Data/ITodos';

interface Props{
  todo:ITodos;
  show:boolean;
  handleClose:()=>void;
  settoggleForUpdate:React.Dispatch<React.SetStateAction<boolean>>
}

export const EditItemModal:React.FC<Props> = ({todo, show, handleClose, settoggleForUpdate}) => {
  const [EditBtnStatus, SetEditBtnStatus ] = useState(false);
  const [submitAction, setSubmitAction] = useState<()=>void>(()=>{});

  const OnCreateClick = ()=> {
    submitAction();
    settoggleForUpdate((prevalue)=>!prevalue);
    handleClose();
  }
  
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit a todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditFormFormikConfig todo={todo} SetEditBtnStatus={SetEditBtnStatus} setSubmitAction={setSubmitAction}/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" form='create-form' disabled={EditBtnStatus} onClick={OnCreateClick}>
          Save edit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
