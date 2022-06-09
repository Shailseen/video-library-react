import React from 'react'
import ReactDom from 'react-dom'
import styles from "./Modal.module.css"

export const Modal = ({ open, children, onClose }) => {
  if (!open) return null

  return ReactDom.createPortal(
    <>
      <div className={styles.overlay} onClick={onClose}/>
      <div className={styles.container}>
        {children}
      </div>
    </>,
    document.getElementById('portal')
  )
}