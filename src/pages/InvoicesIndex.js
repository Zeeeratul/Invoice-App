import React, { useState, useRef, useEffect } from 'react' 
import { useInvoiceData } from '../utils/useInvoiceData'
import { useHistory } from "react-router-dom"
import { ReactComponent as PlusIcon } from '../assets/icon-plus.svg'
import { ReactComponent as ArrowDownIcon } from '../assets/icon-arrow-down.svg'
import { ReactComponent as ArrowRightIcon } from '../assets/icon-arrow-right.svg'
import { ReactComponent as IllustrationEmpty } from '../assets/illustration-empty.svg'
import { H1, H2, H3sm, H3, Body1 } from '../template/Typos'
import _ from 'lodash'

export default function InvoicesIndex() {
    const selectRef = useRef()
    const { state } = useInvoiceData()
    const [filters, setFilters] = useState([])
    const history = useHistory()
    const [openSelect, setOpenSelect] = useState(true)

    const filteredState =  filters.length === 0 ? state : _.filter(state, (o) => _.includes(filters, o.status))

    const handleFilters = (ev) => {
        const index = _.indexOf(filters, ev.target.name)
        if (index < 0)
            setFilters([...filters, ev.target.name])
        else {
            filters.splice(index, 1)
            setFilters([...filters])
        }
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (selectRef.current && !selectRef.current.contains(event.target))
            setOpenSelect(false)
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        };
    }, [selectRef])

    const handleOpenSelect = () => setOpenSelect(!openSelect)

    const handleRedirect = (invoiceId) => {
        history.push(`/${invoiceId}`)
    }

    return (
        <main className="main invoices">
            <header className="invoices-header">
                <div className="info">
                    <H1 className='info__title'>Invoices</H1>
                    <Body1 className="info__number hidden-for-mobile">{filteredState.length > 0 ? `There are ${filteredState.length} pending invoices` : "No invoices"}</Body1>
                    <Body1 className="info__number hidden-for-tablet-desktop">{filteredState.length > 0 ? `${filteredState.length} invoices` : "No invoices"}</Body1>
                </div>

                <div
                    ref={selectRef}
                    className={`select ${openSelect ? 'select--open' : ''}`}
                >
                    <div
                        className="select__title-container"
                        onClick={handleOpenSelect}
                    >
                        <H3sm className="select__title hidden-for-tablet-desktop">Filter</H3sm>
                        <H3sm className="select__title hidden-for-mobile">Filter by status</H3sm>
                        <ArrowDownIcon className="select__arrow" />
                    </div>

                    <div className="select__dropdown"
                        aria-hidden={openSelect ? false : true}
                    >
                        <label className="select__label">
                            <input className="select__checkbox" type="checkbox" checked={_.includes(filters, 'draft')} name="draft" onChange={handleFilters} />
                            <span className="select__custom-checkbox"></span>
                            <H3sm className="select__text">Draft</H3sm>
                        </label>
                        <label className="select__label">
                            <input className="select__checkbox" type="checkbox" checked={_.includes(filters, 'pending')} name="pending" onChange={handleFilters} />
                            <span className="select__custom-checkbox"></span>
                            <H3sm className="select__text">Pending</H3sm>
                        </label>
                        <label className="select__label">
                            <input className="select__checkbox" type="checkbox" checked={_.includes(filters, 'paid')} name="paid" onChange={handleFilters} />
                            <span className="select__custom-checkbox"></span>
                            <H3sm className="select__text">Paid</H3sm>
                        </label>
                    </div>
                </div>

                <button className="button button--icon">
                    <div className="button__circle">
                        <PlusIcon viewBox="0 0 11 11" className="button__plus-icon" />
                    </div>
                    <H3sm className="button__title hidden-for-tablet-desktop">New</H3sm>
                    <H3sm className="button__title hidden-for-mobile">New Invoice</H3sm>
                </button>
            </header>
            {filteredState && filteredState.length > 0 ?
                <div className="invoices-list">
                    {filteredState.map(invoice => (
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
                </div> :
                <div className="invoices-empty">
                    <IllustrationEmpty />
                    <H2 className="invoices-empty__title">There is nothing here</H2>
                    <Body1 className="invoices-empty__body">Create an invoice by clicking the <br />
                        <span className="invoices-empty__new hidden-for-mobile">New Invoice</span>
                        <span className="invoices-empty__new hidden-for-tablet-desktop">New</span> button and get started.
                    </Body1>
                </div> 
            }
        </main>
    )
}

