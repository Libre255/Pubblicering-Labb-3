import React, { useRef, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import CreateTodoForm from './CreateTodoForm';

interface Props{
  show:boolean;
  handleClose:()=>void;
}

export const CreateModal:React.FC<Props> = ({show, handleClose}) => {
  const [disableCreateBtn, SetDisableCreateBtn ] = useState(false);

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create a todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateTodoForm setCreateBtn={SetDisableCreateBtn}/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" type='submit' form='create-form' disabled={disableCreateBtn} onClick={handleClose}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
