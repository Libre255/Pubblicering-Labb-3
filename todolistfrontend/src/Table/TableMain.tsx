import { Col, Container, Row } from 'react-bootstrap'
import "./CSS_TableMain.css"
import trashIcon from './SVG/trashicon.svg'
import editIcon from './SVG/editicon.svg'
import notdoneIcon from './SVG/notdoneicon.svg'
import doneicon from './SVG/doneicon.svg'
import { TableMenu } from '../TableMenu/TableMenu'
import useTodos from '../Hooks/useTodos'

const TableMain:React.FC = () => {
  const {todosList, settoggleForUpdate} = useTodos();

  return (
    <Container fluid="md" >
      <TableMenu settoggleForUpdate={settoggleForUpdate}/>
      <Row className='RowConfig'>
        <Col sm={8}>Name</Col>
        <Col>Done</Col>
        <Col>Actions</Col>
      </Row>
      {/* <Row className='todos-rows'>
        <Col sm={8} className='todos-rows-col'>Test name todos</Col>
        <Col className='todos-rows-col'>
          {donestatus ? <img src={doneicon} alt="doneIcon"/> : <img src={notdoneIcon} alt="notdoneicon"/> }
        </Col>
        <Col className='todos-rows-col actions-col'>
          <img src={editIcon} alt='edit icon'/>
          <img src={trashIcon} alt='trash icon'/>
        </Col>
      </Row> */}
      {todosList.map(todo => (
        <Row className='todos-rows' key={todo.id}>
          <Col sm={8} className='todos-rows-col'>{todo.title}</Col>
          <Col className='todos-rows-col'>
            {todo.done ? <img src={doneicon} alt="doneIcon"/> : <img src={notdoneIcon} alt="notdoneicon"/> }
          </Col>
          <Col className='todos-rows-col actions-col'>
            <img src={editIcon} alt='edit icon'/>
            <img src={trashIcon} alt='trash icon'/>
          </Col>
        </Row>
      ))}
    </Container>
    )
}

export default TableMain;