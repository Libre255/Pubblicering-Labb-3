import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { ITodos } from '../Data/ITodos'
import CreateItem from './CreateItem/CreateItem';
import MailTodos from './MailTodos/MailTodos';

interface Props{
  settoggleForUpdate:React.Dispatch<React.SetStateAction<boolean>>
  todosList:ITodos[];
}

export const TableMenu:React.FC<Props> = ({settoggleForUpdate, todosList}) => {

  return (
    <>
      <Row>
        <Col sm={8} className='d-flex justify-content-center '>
          <InputGroup className="my-2">
            <Form.Control
              placeholder="Search by name"
              aria-label="Search by name"
              aria-describedby="basic-addon2"
            />
            <Button variant="dark" id="button-addon2" className='bg-black' >
              Search
            </Button>
          </InputGroup>
        </Col>
        <CreateItem settoggleForUpdate={settoggleForUpdate}/>
        <MailTodos todosList={todosList}/>
      </Row>
    </>
    )
}
