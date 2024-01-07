import { Col, Container, Row } from 'react-bootstrap'
import "./CSS_TableMain.css"
import trashIcon from './SVG/trashicon.svg'
import editicon from './SVG/editicon.svg'
import notdoneIcon from './SVG/notdoneicon.svg'
import doneicon from './SVG/doneicon.svg'
import { TableMenu } from '../TableMenu/TableMenu'
import useTodos from '../Hooks/useTodos'
import React, { useState } from 'react'
import { EditItemModal } from '../TableMenu/EditItem/EditItemModal'
import { ITodos } from '../Data/ITodos'
import axios from 'axios'

const TableMain:React.FC = () => {
  const {todosList, settoggleForUpdate} = useTodos();
  const [showTodo, setShowTodo] = useState(false)
  const [SelectedTodo, setSelectedTodo] = useState<ITodos>();

  const onClickTodo = (_todo:ITodos)=>{
    setSelectedTodo(_todo);
    setShowTodo(true);
  }
  const onDeletIconClick = async (id:string)=>{
    const req = await axios.delete(`https://localhost:44305/api/SuperHero/${id}`);
    settoggleForUpdate(t => !t);
  }

  return (
    <Container fluid="md" >
      <TableMenu settoggleForUpdate={settoggleForUpdate} todosList={todosList}/>
      <Row className='RowConfig'>
        <Col sm={8}>Name</Col>
        <Col>Done</Col>
        <Col>Actions</Col>
      </Row>
      {todosList.map(todo => (
        <React.Fragment key={todo.id}>
          <Row className='todos-rows' >
            <Col sm={8} className='todos-rows-col' onClick={()=>onClickTodo(todo)}>{todo.title}</Col>
            <Col className='todos-rows-col'>
              {todo.done ? <img src={doneicon} alt="doneIcon"/> : <img src={notdoneIcon} alt="notdoneicon"/> }
            </Col>
            <Col className='todos-rows-col actions-col'>
              <img src={editicon} alt='edit icon' onClick={()=>onClickTodo(todo)}/>
              <img src={trashIcon} alt='trash icon' onClick={()=>onDeletIconClick(todo.id)}/>
            </Col>
          </Row>
        </React.Fragment>
      ))}
      <EditItemModal todo={SelectedTodo!} show={showTodo} handleClose={()=>setShowTodo(false)} settoggleForUpdate={settoggleForUpdate}/>
    </Container>
    )
}

export default TableMain;