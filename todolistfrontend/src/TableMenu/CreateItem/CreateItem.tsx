import React, { useState } from 'react'
import { CreateModal } from '../CreateItem/CreateModal'
import { Button, Col } from 'react-bootstrap';

interface Props{
  settoggleForUpdate:React.Dispatch<React.SetStateAction<boolean>>
}

const CreateItem:React.FC<Props> = ({settoggleForUpdate}) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <Col className='d-flex justify-content-center py-2'>
        <Button variant="info" className=' w-50' onClick={()=>setShow(true)}>Create</Button>
      </Col>
      <CreateModal show={show} handleClose={()=>setShow(false)} settoggleForUpdate={settoggleForUpdate}/>
    </>
  )
}

export default CreateItem;