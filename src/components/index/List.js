import React from 'react' 
import { useHistory } from "react-router-dom"
import { ReactComponent as ArrowRightIcon } from '../../assets/icon-arrow-right.svg'
import { H3sm, H3, Body1 } from '../../template/Typos'

export default function List({ invoices }) {
    const history = useHistory()
    const handleRedirect = (invoiceId) => history.push(`/${invoiceId}`)

    return (
        <div className="invoices-list">
            {invoices.map(invoice => (
                <div 
                    key={invoice.id} 
                    className="card invoice"
                >
                    <H3sm className="invoice__id"><span>#</span>{invoice.id}</H3sm>
                    <Body1 className="invoice__payment-date">{invoice.paymentDue}</Body1>
                    <Body1 className="invoice__client-name">{invoice.clientName}</Body1>
                    <H3 className="invoice__total">£ {invoice.total.toFixed(2)}</H3>
                    <button 
                        className={`invoice__button button-status button-status--${invoice.status}`}
                        onClick={() => handleRedirect(invoice.id)}
                    >
                        <div className="button-status__circle" />
                        <H3sm className="button-status__title">{invoice.status}</H3sm>
                    </button>
                    <ArrowRightIcon className="invoice__arrow" viewBox="0 0 7 10" />
                </div>
            ))}
        </div>
    )
}

