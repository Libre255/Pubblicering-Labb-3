import {useState} from 'react'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { CreateModal } from './CreateModal'

interface Props{
  settoggleForUpdate:React.Dispatch<React.SetStateAction<boolean>>
}

export const TableMenu:React.FC<Props> = ({settoggleForUpdate}) => {
  const [show, setShow] = useState(false)

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

        <Col className='d-flex justify-content-center py-2'>
          <Button variant="info" className=' w-50' onClick={()=>setShow(true)}>Create</Button>
        </Col>
      </Row>
      <CreateModal show={show} handleClose={()=>setShow(false)} settoggleForUpdate={settoggleForUpdate}/>
    </>
    )
}
