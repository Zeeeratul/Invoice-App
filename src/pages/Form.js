import React, { useState } from 'react'
import { useParams, Link, Redirect } from "react-router-dom"
import { ReactComponent as CalendarIcon } from '../assets/icon-calendar.svg'
import { ReactComponent as ArrowLeftIcon } from '../assets/icon-arrow-left.svg'
import { ReactComponent as PlusIcon } from '../assets/icon-plus.svg'

import { H3sm, Body1 } from '../template/Typos'
import DatePicker from '../components/form/DatePicker'
import Input from '../components/form/Input'
import Select from '../components/form/Select'

const currentDate = new Date()

const defaultDate = () => {
    let dayFormated = String(currentDate.getUTCDate())
    let monthFormated = String(currentDate.getMonth() + 1)
    let yearFormated = currentDate.getFullYear()
    dayFormated = dayFormated.length === 2 ? dayFormated : `0${dayFormated}`
    monthFormated = monthFormated.length === 2 ? monthFormated : `0${monthFormated}`
    return `${yearFormated}-${monthFormated}-${dayFormated}`
}

export default function Form() {
    const [form, setForm] = useState({
        date: defaultDate()
    })

    const handleChange = (ev) => {
        const {value, name} = ev.target
        if (name.substr(0, 13) === 'senderAddress') {
            const [,subfield] = name.split('-')
            return setForm({...form, [subfield]: value})
        }
        else if (name.substr(0, 13) === 'clientAddress') {
            const [,subfield] = name.split('-')
            return setForm({...form, [subfield]: value})
        }
        else
            setForm({...form, [name]: value})
    }

    const handleDateChange = (date) => {
        console.log(`date: ${date}`)
        setForm({...form, date})
    }
    console.log(form)

    return (
        <div className="overlay overlay--open overlay--header-above">
            <div className="container">
                <Link to="/" className="link">
                    <ArrowLeftIcon />
                    <H3sm className="link__text">Go back</H3sm>
                </Link>
                <h1 className="container__title">New Invoice</h1>
                <form className="form">
                    <Body1 className="form__block-title">Bill from</Body1>
                    <Input 
                        name="senderAddress-street"
                        value={form?.senderAddress?.street}
                        label="Street Address"
                        fullWidth
                        handleChange={handleChange}
                    />

                    <Input 
                        name="senderAddress-city"
                        value={form?.senderAddress?.city}
                        label="City"
                        // error
                        handleChange={handleChange}
                    />

                    <Input 
                        name="senderAddress-postCode"
                        label="Post Code"
                        value={form?.senderAddress?.postCode}
                        // error
                        handleChange={handleChange}
                    />

                    <Input 
                        name="senderAddress-country"
                        label="Country"
                        value={form?.senderAddress?.country}
                        fullWidth
                        // error
                        handleChange={handleChange}
                    />

                    <Body1 className="form__block-title">Bill to</Body1>

                    <Input 
                        name="clientName"
                        value={form?.clientName}
                        label="Client's Name"
                        fullWidth
                        handleChange={handleChange}
                    />

                    <Input 
                        name="clientEmail"
                        value={form?.clientEmail}
                        label="Client's Email"
                        fullWidth
                        handleChange={handleChange}
                    />

                    <Input 
                        name="clientAddress-street"
                        value={form?.clientAddress?.street}
                        label="Street Address"
                        fullWidth
                        handleChange={handleChange}
                    />

                    <Input 
                        name="clientAddress-city"
                        value={form?.clientAddress?.city}
                        label="City"
                        // error
                        handleChange={handleChange}
                    />

                    <Input 
                        name="clientAddress-postCode"
                        value={form?.clientAddress?.postCode}
                        label="Post Code"
                        // error
                        handleChange={handleChange}
                    />

                    <Input 
                        name="clientAddress-country"
                        value={form?.clientAddress?.country}
                        label="Country"
                        fullWidth
                        // error
                        handleChange={handleChange}
                    />

                    <DatePicker
                        onChange={handleDateChange}
                        date={form.date}
                    />

                    <Select />

                    <Input 
                        name="description"
                        value={form?.description}
                        label="Project Description"
                        fullWidth
                        // error
                        handleChange={handleChange}
                    />
                    <div>Items list</div>

                    <button className="form__button">
                        <PlusIcon viewBox="0 0 11 11" className="form__button__icon" />
                        Add New Item
                    </button>

      
                </form>
            
                <footer>test</footer>
            </div>

        </div>
    )
}
