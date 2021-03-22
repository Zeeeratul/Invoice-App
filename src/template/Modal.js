import React from 'react' 
import { Body1 } from './Typos'

export default function Modal({ isOpen, close, deleteInvoice }) {

    const handleCloseOverlay = (ev) => {
        if (ev.target === ev.currentTarget)
            close()
    }

    return (
        <div 
            className={`overlay ${isOpen ? 'overlay--open-flex' : 'overlay--close'} center `} 
            onClick={handleCloseOverlay}
            aria-hidden={isOpen ? true : false}
        >
            <div className="modal card">
                <h2 className="modal__title">Confirm Deletion</h2>
                <Body1 className="modal__text">Are you sure you want to delete invoice #XM9141? This action cannot be undone.</Body1>
                <div className="modal__row">
                    <button className="modal__button button button--edit" onClick={close}>Cancel</button>
                    <button className="modal__button button button--delete" onClick={deleteInvoice}>Delete</button>
                </div>
            </div>
        </div>
    )
}