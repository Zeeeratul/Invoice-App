import React from 'react' 
import { useInvoiceData } from '../utils/useInvoiceData'
import { useParams, Link } from "react-router-dom"
import { ReactComponent as ArrowLeftIcon } from '../assets/icon-arrow-left.svg'
import { H3, H3sm, Body1, Body2 } from '../template/Typos'
import _ from 'lodash'

export default function Invoice() {
    const { state } = useInvoiceData()
    const { id } = useParams()
    const invoice = state ? _.find(state, { 'id' : id }) : null

    console.log(invoice)

    return (
        <main className="main">
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
            </div>

            <div className="card informations">
                <div className="sender">
                    <H3 className="sender__id"><span className="sender__hashtag">#</span>{invoice.id}</H3>
                    <Body1 className="sender__desc">{invoice.description}</Body1>
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


                <div className="resume">
                    <div className="items_lists">
                        {invoice.items.map(item => (
                            <div className="item" key={`invoice_item_${item.name}`}>
                                <H3sm className="item__name">{item.name}</H3sm>
                                <H3sm className="item__sum">{item.quantity} x £ {item.price}</H3sm>
                                <H3sm className="item__total">£ {item.price * item.quantity}</H3sm>
                            </div>
                        ))}
                    </div>
                    <div className="resume__total">
                        <Body2 className="resume__text">Amount due</Body2>
                        <span className="resume__sum">£ {invoice.total}</span>
                    </div>
                </div>
            </div>

        </main>
    )
}

