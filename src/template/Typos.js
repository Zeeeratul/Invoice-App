import React from 'react'

const H1 = ({ className = '', ...props }) => (
    <h1 {...props} className={`h1 ${className}`}>{props.children}</h1>
)

const H2 = ({ className = '', ...props }) => (
    <h2 {...props} className={`h2 ${className}`}>{props.children}</h2>
)

const H3 = ({ className = '', ...props }) => (
    <h3 {...props} className={`h3 ${className}`}>{props.children}</h3>
)

const H3sm = ({ className = '', ...props }) => (
    <h3 {...props} className={`h3sm ${className}`}>{props.children}</h3>
)

const Body1 = ({ className = '', ...props }) => (
    <p {...props} className={`body1 ${className}`}>{props.children}</p>
)

const Body2 = ({ className = '', ...props }) => (
    <p {...props} className={`body2 ${className}`}>{props.children}</p>
)

export {
    H1,
    H2,
    H3,
    H3sm,
    Body1,
    Body2,
}