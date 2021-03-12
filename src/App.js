import React, { useState } from 'react'
// import { ThemeContext } from './utils/ThemeContext'
import { BrowserRouter as Router, Route } from "react-router-dom"
// import Navbar from './components/Navbar'
// import InvoicesList from './pages/InvoicesList'
// import Invoice from './pages/Invoice'

function App() {

  // const [theme, setTheme] = useState('light')
  // const changeTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')
  
  return (
    <p>test</p>
    // <ThemeContext.Provider value={{
    //   changeTheme,
    //   theme
    // }}>
    //   <div className={`App ${theme === 'light' ? 'theme--defaut' : 'theme--dark'}`}>
    //     <Navbar />
    //     <Router>
    //       <Route exact path="/">
    //         <InvoicesList />
    //       </Route>
    //       <Route path="/:id">
    //         <Invoice />
    //       </Route>
    //     </Router>
    //   </div>
    // </ThemeContext.Provider>
  )
}

export default App;
