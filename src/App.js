import React, { useState } from 'react'
import { ThemeContext } from './utils/ThemeContext'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Header from './template/Header'
import InvoicesIndex from './pages/InvoicesIndex'
// import Invoice from './pages/Invoice'

function App() {

  const [theme, setTheme] = useState('light')
  const changeTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')
  
  return (
    <div className={`App theme-${theme}`}>
      <Header currentTheme={theme} changeTheme={changeTheme} />
      <Router>
        <Route exact path="/">
          <InvoicesIndex />
        </Route>
      </Router>
    </div>
  )
}

export default App;
