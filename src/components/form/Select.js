import React, { useState, useEffect, useRef } from 'react'
import {ReactComponent as IconArrowDown} from '../../assets/icon-arrow-down.svg'

function Select({ value = 1 }) {
    const [open, setOpen] = useState(false)
    const ref = useRef()
    const handleOpen = (ev) => setOpen(!open)

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target))
                setOpen(false)
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        };
    }, [ref])

    return (
        <div ref={ref} className={`select ${open ? 'select--open' : ''}`}>
            <div className="select__title" onClick={handleOpen}>
                <label className="select__label">Payment Terms</label>
                <div className="select__input">
                    Net {value} day
                    <IconArrowDown className="select__arrow" />
                </div>
            </div>
            <div className="select__dropdown">
                <ul className="select__list">
                    <li className="select__item">Net 1 Day</li>
                    <li className="select__item">Net 7 Days</li>
                    <li className="select__item">Net 14 Days</li>
                    <li className="select__item">Net 30 Days</li>
                </ul>
            </div>
        </div>
    )
}

export default Select