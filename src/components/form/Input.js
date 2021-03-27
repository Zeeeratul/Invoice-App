import React from 'react'

function Input({ name, value = '', label, error, handleChange, fullWidth = false }) {
    const inputBlockClassnames = `input-block ${fullWidth ? 'input-block--full' : ''} ${error ? 'input-block--error' : ''}`
    
    return (
        <div className={inputBlockClassnames}>
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

export default Input