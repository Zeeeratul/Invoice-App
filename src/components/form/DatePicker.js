import React, { useState, useRef, useEffect } from 'react'
import { ReactComponent as CalendarIcon } from '../../assets/icon-calendar.svg'
import { ReactComponent as ArrowLeftIcon } from '../../assets/icon-arrow-left.svg'
import { ReactComponent as ArrowRightIcon } from '../../assets/icon-arrow-right.svg'

const range = (start, end) => Array(end - start + 1).fill().map((_, idx) => start + idx)
const months = [
    {
        name: "January",
        abbr: "Jan",
        days: range(1, 31)
    },
    {
        name: "February",
        abbr: "Feb",
        days: range(1, 28)
    },
    {
        name: "March",
        abbr: "Mar",
        days: range(1, 31)
    },
    {
        name: "April",
        abbr: "Apr",
        days: range(1, 30)
    },
    {
        name: "May",
        abbr: "May",
        days: range(1, 31)
    },
    {
        name: "June",
        abbr: "Jun",
        days: range(1, 30)
    },
    {
        name: "Juillet",
        abbr: "Jul",
        days: range(1, 31)
    },
    {
        name: "August",
        abbr: "Aug",
        days: range(1, 31)
    },
    {
        name: "September",
        abbr: "Sep",
        days: range(1, 30)
    },
    {
        name: "October",
        abbr: "Oct",
        days: range(1, 31)
    },
    {
        name: "November",
        abbr: "Nov",
        days: range(1, 30)
    },
    {
        name: "December",
        abbr: "Dec",
        days: range(1, 31)
    },
]

const getMonthFromDate = (date) => {
    const splitedDate = date.split('-')
    return parseInt(splitedDate[1])
}

const getYearFromDate = (date) => {
    const splitedDate = date.split('-')
    return parseInt(splitedDate[0])
}

export default function DatePicker({ date = "2021-01-01", onChange }) {
    const [open, setOpen] = useState(false)
    const [currentMonth, setCurrentMonth] = useState(() => getMonthFromDate(date))
    const [currentYear, setCurrentYear] = useState(() => getYearFromDate(date))
    const ref = useRef()
    const handleOpen = () => setOpen(!open)

    const handleDayClick = (day) => {
        let dayFormated = String(day)
        let monthFormated = String(currentMonth)
        let yearFormated = String(currentYear)
        dayFormated = dayFormated.length === 2 ? dayFormated : `0${dayFormated}`
        monthFormated = monthFormated.length === 2 ? monthFormated : `0${monthFormated}`
        onChange(`${yearFormated}-${monthFormated}-${dayFormated}`)
    }

    const handleChangeMonth = (action) => {
        if (action === 'decrement') {
            if (currentMonth === 1) {
                setCurrentYear(currentYear - 1)
                setCurrentMonth(12)
            }
            else 
                setCurrentMonth(currentMonth - 1)
        }
        else {
            if (currentMonth === 12) {
                setCurrentYear(currentYear + 1)
                setCurrentMonth(1)
            }
            else 
                setCurrentMonth(currentMonth + 1)
        }
    }

    const convertDate = (date) => {
        const splited = date.split('-')
        return `${splited[2]} ${months[splited[1] - 1].abbr} ${splited[0]}`
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target))
                setOpen(false)
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [ref])

    return (
        <div className={`date-picker ${open ? 'date-picker--open' : ''}`} ref={ref}>
            <div className="date-picker__title" onClick={handleOpen}>
                <label className="date-picker__label">Invoice Date</label>
                <div className="date-picker__input">
                    {convertDate(date)}
                    <CalendarIcon />
                </div>
            </div>

            <div className="date-picker__dropdown">
                <div className="date-picker__header">
                    <ArrowLeftIcon onClick={() => handleChangeMonth('decrement')} className="date-picker__arrow" />
                    {months[currentMonth - 1].abbr} {currentYear}
                    <ArrowRightIcon onClick={() => handleChangeMonth('increment')} className="date-picker__arrow" />
                </div>
                <div className="date-picker__calendar">
                    {months[currentMonth - 1].days.map(day => (
                        <div 
                            className="date-picker__calendar__day" 
                            key={`day_${day}`}
                            onClick={() => handleDayClick(day)}
                        >
                            {day}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
