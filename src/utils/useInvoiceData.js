import React, { useReducer, useEffect } from 'react'
import InvoicesData from '../data/data.json'
import _ from 'lodash'

// put json in the state
// create new
// update 
// delete
// when process an action, do it in the local storage aswell



// check if there is something in local storage 


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
        console.log('here register the state in localstorage')
    }, [state])

    return {
        state,
        dispatch
    }
}

export {
    useInvoiceData
}