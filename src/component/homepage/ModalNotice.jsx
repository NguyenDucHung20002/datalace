import React from 'react'
import { Modal } from 'react-bootstrap';
import { PiSealWarning } from 'react-icons/pi';

export default function ModalNotice({show,setShow,message}) {
  return (
    <Modal show={show} onHide={!show} centered>
        <Modal.Header style={{ background: "#00178d", border: "none" ,height:'15px'}}>
        
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={() => {
              setShow(!show);
            }}
          />
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundImage:
              "linear-gradient(180deg, #00178D 27.35%, #095397 103.4%, #095397 103.41%)",
              textAlign:'center'
          }}
        >
          {/* <h1 style={{fontWeight:'bold'}}>Error</h1> */}
          <PiSealWarning size={45} style={{color:'white', textAlign:'center'}}/>
          <p>{message}</p>
        </Modal.Body>
      </Modal>
  )
}
