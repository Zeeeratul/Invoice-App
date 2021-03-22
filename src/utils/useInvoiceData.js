import { useReducer, useEffect } from 'react'
import InvoicesData from '../invoices.json'
import _ from 'lodash'

function init(initialState) {
    const localStorageState = window.localStorage.getItem('invoices_data')
    const parsedLocalStorage = JSON.parse(localStorageState)
    if (parsedLocalStorage && parsedLocalStorage.length > 0)
        return parsedLocalStorage
    return initialState
}

function reducer(state, action) {
    switch (action.type) {
        case 'delete': {
            const newState = _.reject(state, { 'id': action.id })
            return newState
        }
        case 'update': {
            const invoiceIndex = _.findIndex(state, { 'id': action.id })
            const newState = _.cloneDeep(state)
            newState[invoiceIndex] = action.data
            return newState
        }
        case 'create': {
            state.push({ id: 'test' })
            return [...state]
        }
        default:
            console.log('default')
            throw new Error();
    }
}


function useInvoiceData() {
    const [state, dispatch] = useReducer(reducer, InvoicesData, init)

    useEffect(() => {
        const stringifiedState = JSON.stringify(state)
        window.localStorage.setItem('invoices_data', stringifiedState)
    }, [state])

    return {
        state,
        dispatch
    }
}

export { useInvoiceData }