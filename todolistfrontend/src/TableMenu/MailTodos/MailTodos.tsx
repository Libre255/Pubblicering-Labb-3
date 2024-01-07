import React, { useState } from 'react'
import { Col } from 'react-bootstrap';
import mailicon from '../../Table/SVG/mailicon.svg';
import { ITodos } from '../../Data/ITodos';
import MailTodosModal from './MailTodosModal';

interface Props{
  todosList:ITodos[];
}
const MailTodos:React.FC<Props> = ({todosList}) => {
  const [showModal, setShowModal ] = useState(false);
  
  return (
    <>
      <Col className='d-flex justify-content-center py-2'>
        <img src={mailicon} alt='mail icon' className='mailicon' onClick={()=>setShowModal(true)}/>
      </Col>
      <MailTodosModal show={showModal} handleClose={()=>setShowModal(false)} todosList={todosList}/>
    </>
  )
}
export default MailTodos;