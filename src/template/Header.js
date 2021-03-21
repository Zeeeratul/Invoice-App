import React from 'react' 
import { ReactComponent as Logo } from '../assets/logo.svg'
import { ReactComponent as SunIcon } from '../assets/icon-sun.svg'
import { ReactComponent as MoonIcon } from '../assets/icon-moon.svg'
import Avatar from '../assets/image-avatar.jpg'

export default function Header({ currentTheme, changeTheme }) {
    return (
        <header className="header">
            <div className="logo">
                <Logo className="logo__icon" viewBox="0 0 28 26" />
            </div>

            <button className="theme-toggler" onClick={changeTheme}>
            {currentTheme === 'light' ? 
                <MoonIcon className="theme-toggle__icon" /> :
                <SunIcon className="theme-toggle__icon" />
            }
            </button>

            <div className="avatar">
                <img className="avatar__image" src={Avatar} alt="" />
            </div>
        </header>
    )
}

