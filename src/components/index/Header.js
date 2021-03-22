import React, { useState, useRef, useEffect } from 'react' 
import { ReactComponent as PlusIcon } from '../../assets/icon-plus.svg'
import { ReactComponent as ArrowDownIcon } from '../../assets/icon-arrow-down.svg'
import { H1, H3sm, Body1 } from '../../template/Typos'
import { useHistory } from "react-router-dom"
import _ from 'lodash'


export default function Header({ filters, handleFilters, invoices }) {
    const selectRef = useRef()
    const [openSelect, setOpenSelect] = useState(false)
    const history = useHistory()


    const handleRedirect = () => {
        history.push('/new')
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

    const invoicesDesktopText = invoices.length > 0 ? 
    invoices.length > 1 ? `There are ${invoices.length} pending invoices` :
    'There is 1 pending invoice' :
    "No invoices"

    return (
        <header className="invoices-header">
            <div className="info">
                <H1 className='info__title'>Invoices</H1>
                <Body1 className="info__number hidden-for-mobile">{invoicesDesktopText}</Body1>
                <Body1 className="info__number hidden-for-tablet-desktop">{invoices.length > 0 ? `${invoices.length} invoices` : "No invoices"}</Body1>
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

            <button className="button button--icon" onClick={handleRedirect}>
                <div className="button__circle">
                    <PlusIcon viewBox="0 0 11 11" className="button__plus-icon" />
                </div>
                <H3sm className="button__title hidden-for-tablet-desktop">New</H3sm>
                <H3sm className="button__title hidden-for-mobile">New Invoice</H3sm>
            </button>
        </header>
    )
}