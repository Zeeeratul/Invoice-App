import React, { useState } from 'react' 
import { useInvoiceData } from '../utils/useInvoiceData'
import { useHistory } from "react-router-dom"
import { ReactComponent as PlusIcon } from '../assets/icon-plus.svg'
import { ReactComponent as ArrowDownIcon } from '../assets/icon-arrow-down.svg'
import { H1, H3sm, H3, Body1 } from '../template/Typos'
import _ from 'lodash'

export default function InvoicesIndex() {
    const { state } = useInvoiceData()
    const [filters, setFilters] = useState([])
    const history = useHistory()
    const filteredState = filters.length === 0 ? state : _.filter(state, (o) => _.includes(filters, o.status))

    const handleFilters = (ev) => {
        const index = _.indexOf(filters, ev.target.name)
        if (index < 0)
            setFilters([...filters, ev.target.name])
        else {
            filters.splice(index, 1)
            setFilters([...filters])
        }
    }

    const handleRedirect = (invoiceId) => {
        history.push(`/${invoiceId}`)
    }

    return (
        <main className="main">
            <header className="invoices-header">
                <div className="info">
                    <H1 className='info__title'>Invoices</H1>
                    <Body1 className="info__number">{filteredState.length > 0 ? `${filteredState.length} invoices` : "No invoices"}</Body1>
                </div>

                {/* TBD DROPDOWN  */}
                <div className="select">
                    <H3sm className="select__title">Filter</H3sm>
                    <ArrowDownIcon className="select__arrow" />
                </div>

                <button className="button button--icon">
                    <div className="button__circle">
                        <PlusIcon viewBox="0 0 11 11" className="button__icon" />
                    </div>
                    <H3sm className="button__title">New</H3sm>
                </button>
            </header>
            <div className="invoices-list">
                {filteredState.map(invoice => (
                    <div 
                        key={invoice.id} 
                        className="card invoice"
                    >
                        <H3sm className="invoice__id"><span>#</span>{invoice.id}</H3sm>
                        <Body1 className="invoice__payment-date">{invoice.paymentDue}</Body1>
                        <Body1 className="invoice__client-name">{invoice.clientName}</Body1>
                        <H3 className="invoice__total">£ {invoice.total}</H3>
                        <button 
                            className={`invoice__button button-status button-status--${invoice.status}`}
                            onClick={() => handleRedirect(invoice.id)}
                        >
                            <div className="button-status__circle" />
                            <H3sm className="button-status__title">{invoice.status}</H3sm>
                        </button>
                    </div>
                ))}
            </div>
        </main>
    )
}

