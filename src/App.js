import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from './template/Header'
import InvoicesIndex from './pages/InvoicesIndex'
import Invoice from './pages/Invoice'
import Form from './pages/Form'
import { useInvoiceData } from './utils/useInvoiceData'
import { InvoicesContext } from './utils/InvoicesContext'

function App() {
  const [theme, setTheme] = useState('light')
  const { state: invoices, dispatch } = useInvoiceData()
  const changeTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')
  
  return (
    <InvoicesContext.Provider value={{invoices, dispatch}}>
      <div className={`App theme-${theme}`}>
        <Router>
          <Header currentTheme={theme} changeTheme={changeTheme} />
          <Switch>
            <Route exact path="/new">
              <InvoicesIndex />
              <Form />
            </Route>
            <Route exact path="/:id">
              <Invoice />
            </Route>
            <Route path="/">
              <InvoicesIndex />
            </Route>
          </Switch>
        </Router>
      </div>
    </InvoicesContext.Provider>
  )
}

export default App