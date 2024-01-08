import { Col, Form, InputGroup, Row } from 'react-bootstrap'
import { ITodos } from '../Data/ITodos'
import CreateItem from './CreateItem/CreateItem';
import MailTodos from './MailTodos/MailTodos';

interface Props{
  settoggleForUpdate:React.Dispatch<React.SetStateAction<boolean>>;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  todosList:ITodos[];
}

export const TableMenu:React.FC<Props> = ({settoggleForUpdate, setSearchInput ,todosList}) => {

  return (
    <>
      <Row>
        <Col sm={8} className='d-flex justify-content-center '>
          <InputGroup className="my-2">
            <Form.Control
              onChange={(e) => {setSearchInput(e.target.value)}}
              placeholder="Search by name"
              aria-label="Search by name"
              aria-describedby="basic-addon2"
            />
          </InputGroup>
        </Col>
        <CreateItem settoggleForUpdate={settoggleForUpdate}/>
        <MailTodos todosList={todosList}/>
      </Row>
    </>
    )
}
