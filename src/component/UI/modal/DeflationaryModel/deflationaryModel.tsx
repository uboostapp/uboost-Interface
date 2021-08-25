import React from 'react'
import { useContext } from 'react'
import { Modal, Card, Button } from 'react-bootstrap'
import { ThemeContext } from 'context/themeContext'
import './deflationaryModel.scss'

const DeflationaryModel = (props) => {
  const data: any = useContext(ThemeContext)
  return (
    <div>
      <Modal className={`model-deflationary-${data.theme}`} {...props} centered size="md">
        <Modal.Header closeButton className="custom-modal-header">
          <Modal.Title>
            <p>Deflationary%(optional)</p>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Card className="input-card">
            <Card.Body className="defaltionary-cardBody">
              <input type="text" placeholder="0.0" />
            </Card.Body>
          </Card>
          <div className={`main-action`}>
            <Button className="custom-btn">Select Coin</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default DeflationaryModel
