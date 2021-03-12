import React from 'react' 

export default function InvoiceFooter() {
    return (
        <footer className="footer">
            <button className="button button--edit">Edit</button>
            <button className="button button--delete">Delete</button>
            <button className="button button--mark-paid">Mark as Paid</button>
        </footer>
    )
}

