import React, { useState, useContext } from 'react' 
import InvoiceHeader from '../components/index/Header'
import InvoicesList from '../components/index/List'
import InvoiceEmpty from '../components/index/Empty'
import { InvoicesContext } from '../utils/InvoicesContext'
import _ from 'lodash'

export default function InvoicesIndex() {
    const { invoices } = useContext(InvoicesContext)
    const [filters, setFilters] = useState([])

    const filteredInvoices =  filters.length === 0 ? invoices : _.filter(invoices, (o) => _.includes(filters, o.status))

    const handleFilters = (ev) => {
        const index = _.indexOf(filters, ev.target.name)
        if (index < 0)
            setFilters([...filters, ev.target.name])
        else {
            filters.splice(index, 1)
            setFilters([...filters])
        }
    }

    return (
        <main className="main invoices">
            <InvoiceHeader filters={filters} handleFilters={handleFilters} invoices={filteredInvoices} />
            {filteredInvoices && filteredInvoices.length > 0 ?
                <InvoicesList invoices={filteredInvoices} /> :
                <InvoiceEmpty />
            }
        </main>
    )
}