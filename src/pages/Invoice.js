import React, { useState, useContext } from 'react' 
import { useParams, Link, Redirect, useHistory } from "react-router-dom"
import { ReactComponent as ArrowLeftIcon } from '../assets/icon-arrow-left.svg'
import { H3, H3sm, Body1, Body2 } from '../template/Typos'
import Modal from '../template/Modal'
import { InvoicesContext } from '../utils/InvoicesContext'
import _ from 'lodash'

export default function Invoice() {
    const { invoices, dispatch } = useContext(InvoicesContext)
    const { id } = useParams()
    const history = useHistory()
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const invoice = invoices ? _.find(invoices, { 'id' : id }) : null

    const openModal = () => setOpenDeleteModal(true)
    const closeModal = () => setOpenDeleteModal(false)
    const deleteInvoice = () => {
        dispatch({ type: 'delete', id: invoice.id })
        history.push('/')
    }

    console.log(invoice)

    if (!invoice) return <Redirect to="/" />

    return (
        <>
        <Modal isOpen={openDeleteModal} close={closeModal} deleteInvoice={deleteInvoice} />
        <main className="main invoice-page">
            <Link to="/" className="link">
                <ArrowLeftIcon />
                <H3sm className="link__text">Go back</H3sm>
            </Link>

            <div className="card status">
                <Body1 className="status__text">Status</Body1>
                <button className={`button-status button-status--${invoice.status}`}>
                    <div className="button-status__circle" />
                    <H3sm className="button-status__title">{invoice.status}</H3sm>
                </button>
                <div className="crud-buttons">
                    <button className="crud-buttons__button button button--edit">Edit</button>
                    <button className="crud-buttons__button button button--delete" onClick={openModal}>Delete</button>
                    <button className="crud-buttons__button button button--mark-paid">Mark as Paid</button>
                </div>
            </div>

            <div className="card informations">
                <div className="sender">
                    <div>
                        <H3 className="sender__id"><span className="sender__hashtag">#</span>{invoice.id}</H3>
                        <Body1 className="sender__desc">{invoice.description}</Body1>
                    </div>
                    <Body2 className="sender__addr">
                        {invoice.senderAddress.street}<br/>
                        {invoice.senderAddress.city}<br/>
                        {invoice.senderAddress.postCode}<br/>
                        {invoice.senderAddress.country}
                    </Body2>
                </div>

                <div className="dates">
                    <div className="dates__invoice">
                        <Body1 className="dates__title">Invoice Date</Body1>
                        <H3 className="dates__date">{invoice.createdAt}</H3>
                    </div>
                    <div className="dates__payment">
                        <Body1 className="dates__title">Payment Due</Body1>
                        <H3 className="dates__date">{invoice.paymentDue}</H3>
                    </div>
                </div>

                <div className="client-infos">
                    <Body1 className="client-infos__title">Bill To</Body1>
                    <H3 className="client-infos__name">{invoice.clientName}</H3>
                    <Body2 className="client-infos__addr">
                        {invoice.clientAddress.street}<br/>
                        {invoice.clientAddress.city}<br/>
                        {invoice.clientAddress.postCode}<br/>
                        {invoice.clientAddress.country}
                    </Body2>
                </div>

                <div className="client-email">
                    <Body1 className="client-email__send">Send to</Body1>
                    <H3 className="client-email__email">{invoice.clientEmail}</H3>
                </div>

                <table className="table-resume">
                    <thead className="table-resume__header">
                        <tr>
                            <th className="table-resume__cell table-resume__cell--first"><Body2>Item Name</Body2></th>
                            <th className="table-resume__cell table-resume__cell--second"><Body2>QTY.</Body2></th>
                            <th className="table-resume__cell table-resume__cell--third"><Body2>Price</Body2></th>
                            <th className="table-resume__cell table-resume__cell--last"><Body2>Total</Body2></th>
                        </tr>
                    </thead>
                    <tbody className="table-resume__body">
                        {invoice.items.map(item => (
                            <tr key={`invoice_item_${item.name}`}>
                                <td 
                                className="table-resume__cell table-resume__cell--first"
                                ><H3sm>{item.name}</H3sm></td>
                                <td 
                                className="table-resume__cell table-resume__cell--second"
                                ><H3sm>{item.quantity}</H3sm></td>
                                <td 
                                className="table-resume__cell table-resume__cell--third"
                                ><H3sm>£ {item.price.toFixed(2)}</H3sm></td>
                                <td 
                                className="table-resume__cell table-resume__cell--last"
                                ><H3sm>£ {(item.price * item.quantity).toFixed(2)}</H3sm></td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="table-resume__footer">
                        <tr>
                            <th className="table-resume__amount-due" colSpan="2"><Body2>Amount Due</Body2></th>
                            <th className="table-resume__total" colSpan="2">£ {invoice.total.toFixed(2)}</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </main>
        <footer className="invoice-footer">
            <button className="button button--edit">Edit</button>
            <button className="button button--delete" onClick={openModal}>Delete</button>
            <button className="button button--mark-paid">Mark as Paid</button>
        </footer>
        </>
    )
}