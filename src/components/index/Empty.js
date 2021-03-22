import React from 'react' 
import { ReactComponent as IllustrationEmpty } from '../../assets/illustration-empty.svg'
import { H2, Body1 } from '../../template/Typos'

export default function Empty() {
    return (
        <div className="invoices-empty">
            <IllustrationEmpty />
            <H2 className="invoices-empty__title">There is nothing here</H2>
            <Body1 className="invoices-empty__body">Create an invoice by clicking the <br />
                <span className="invoices-empty__new hidden-for-mobile">New Invoice</span>
                <span className="invoices-empty__new hidden-for-tablet-desktop">New</span> button and get started.
            </Body1>
        </div> 
    )
}