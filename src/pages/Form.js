import React from 'react'
import { useParams, Link, Redirect } from "react-router-dom"
import { ReactComponent as ArrowLeftIcon } from '../assets/icon-arrow-left.svg'
import { H3sm, Body1 } from '../template/Typos'

function Input({ name, value, label, error, handleChange }) {
    return (
        <div className={`input-block ${error ? 'input-block--error' : ''}`}>
            <label className="input-block__label" htmlFor={name}>
                {label}
                <span className="input-block__error-text">can't be empty</span>
            </label>
            <input 
                className="input-block__input"
                id={name} 
                name={name} 
                value={value} 
                onChange={handleChange} 
            />
        </div>
    )
}


export default function Form() {

    const handleChange = (ev) => {
        console.log(ev.target)
    }

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
                        name="client-name"
                        value="test"
                        label="Client's Name"
                        // error
                        handleChange={handleChange}
                    />
                    <div>
                        <Input 
                            name="client-name"
                            value="test"
                            label="Client's Name"
                            // error
                            handleChange={handleChange}
                        />
                        <Input 
                            name="client-name"
                            value="test"
                            label="Client's Name"
                            // error
                            handleChange={handleChange}
                        />
                        <Input 
                            name="client-name"
                            value="test"
                            label="Client's Name"
                            // error
                            handleChange={handleChange}
                        />

                    </div>
      
                </form>
            </div>

        </div>
    )
}
